import datetime as dt
import re
from backend.src.model.mysql import Activity


class Fact(object):
    def __init__(self, text=None, start_time=None, end_time=None, activity=None, category=None, description=None,
                 tags=None):
        self.start_time = start_time
        self.end_time = end_time
        self.activity = activity  # задача и имя активности
        self.category = category  # проект
        self.description = description  # описание
        self.tags = tags
        self.__task_id = None
        self.__task_name = None

        if text is not None:
            if type(text) == str:
                fact = Hamster.parse_fact(text)
                for key in fact:
                    if fact[key] == '':
                        fact[key] = None
                    self.__dict__[key] = fact[key]
            if isinstance(text, Activity):
                self.start_time = text.time_start
                self.end_time = text.time_end
                self.activity = str(text.task.external_task_id) + ' ' + text.name
                self.category = text.task.project.code
                self.description = text.comment
                self.tags = {tag.name for tag in text.hashtags}

        # if len(kwargs):
        #     for key, value in kwargs.items():
        #         self.__dict__[key] = value

        self.__task_id = self.get_task_id()
        self.__task_name = self.get_task_name()

    def validate(self):
        req_fields = ('start_time', 'activity')
        for field in req_fields:
            if self.__dict__[field] is None:
                return False
        return True

    def get_task_id(self):
        if self.__task_id is not None:
            return self.__task_id

        if self.activity is None:
            return None

        task_id = re.findall('^(\d*)\s*.*', self.activity)
        return task_id
        if len(task_id) < 1 or task_id is None or task_id == '':
            return None

        self.__task_id = int(task_id.pop())
        return self.__task_id

    def get_task_name(self):
        if self.__task_name is not None:
            return self.__task_name

        if self.activity is None:
            return None

        name = re.findall('^\d*\s*(.*)', self.activity)
        if name is None:
            return None
        name = name.pop().strip()

        self.__task_name = name
        return self.__task_name

    def as_text(self):
        tags = {'#' + tag for tag in self.tags}
        s = ''
        if self.__task_id: s += str(self.__task_id)
        if self.__task_name: s += ' ' + self.__task_name
        if self.category: s += '@' + self.category
        if len(tags): s += ' ' + ', '.join(tags)
        if self.description: s += ', ' + self.description
        return s


class FormattedFact(Fact):
    def __init__(self, text=None, start_time=None, end_time=None, activity=None, category=None, description=None,
                 tags=None, id=None, activity_id=None):
        super().__init__(text, start_time, end_time, activity, category, description, tags)
        self.delta = self.__delta()
        self.date = self.start_time.strftime('%d.%m.%Y') if self.start_time is not None else None
        self.start_time = self.start_time.strftime('%H:%M') if self.start_time is not None else None
        self.end_time = self.end_time.strftime('%H:%M') if self.end_time is not None else None
        self.id = id
        self.activity_id = activity_id
        self.tags = list(self.tags)
        self.name = self.activity

        if isinstance(text, Activity):
            self.id = text.id
            self.activity_id = text.task.external_task_id

    def __delta(self):
        if self.start_time is None:
            return None
        end_time = self.end_time or dt.datetime.now()
        delta = end_time - self.start_time
        return round(delta.total_seconds() / 3600, 2)


class Hamster(object):
    @staticmethod
    def __looks_like_time(fragment):
        _time_fragment_re = [
            re.compile("^-$"),
            re.compile("^([0-1]?[0-9]?|[2]?[0-3]?)$"),
            re.compile("^([0-1]?[0-9]|[2][0-3]):?([0-5]?[0-9]?)$"),
            re.compile("^([0-1]?[0-9]|[2][0-3]):([0-5][0-9])-?([0-1]?[0-9]?|[2]?[0-3]?)$"),
            re.compile("^([0-1]?[0-9]|[2][0-3]):([0-5][0-9])-([0-1]?[0-9]|[2][0-3]):?([0-5]?[0-9]?)$"),
        ]
        if not fragment:
            return False
        return any((r.match(fragment) for r in _time_fragment_re))

    @classmethod
    def parse_fact(cls, text, phase=None):
        """tries to extract fact fields from the string
            the optional arguments in the syntax makes us actually try parsing
            values and fallback to next phase
            start -> [end] -> activity[@category] -> tags

            Returns dict for the fact and achieved phase

            TODO - While we are now bit cooler and going recursively, this code
            still looks rather awfully spaghetterian. What is the real solution?
        """
        now = dt.datetime.now()

        # determine what we can look for
        phases = [
            "start_time",
            "end_time",
            "activity",
            "category",
            "tags",
        ]

        phase = phase or phases[0]
        phases = phases[phases.index(phase):]
        res = {}

        text = text.strip()
        if not text:
            return {}

        fragment = re.split("[\s|#]", text, 1)[0].strip()

        def next_phase(fragment, phase):
            res.update(cls.parse_fact(text[len(fragment):], phase))
            return res

        if "start_time" in phases or "end_time" in phases:
            # looking for start or end time

            delta_re = re.compile("^-[0-9]{1,3}$")
            time_re = re.compile("^([0-1]?[0-9]|[2][0-3]):([0-5][0-9])$")
            time_range_re = re.compile("^([0-1]?[0-9]|[2][0-3]):([0-5][0-9])-([0-1]?[0-9]|[2][0-3]):([0-5][0-9])$")

            if delta_re.match(fragment):
                res[phase] = now + dt.timedelta(minutes=int(fragment))
                return next_phase(fragment, phases[phases.index(phase) + 1])

            elif time_re.match(fragment):
                res[phase] = dt.datetime.combine(now.date(), dt.datetime.strptime(fragment, "%H:%M").time())
                return next_phase(fragment, phases[phases.index(phase) + 1])

            elif time_range_re.match(fragment) and phase == "start_time":
                start, end = fragment.split("-")
                res["start_time"] = dt.datetime.combine(now.date(), dt.datetime.strptime(start, "%H:%M").time())
                res["end_time"] = dt.datetime.combine(now.date(), dt.datetime.strptime(end, "%H:%M").time())
                phase = "activity"
                return next_phase(fragment, "activity")

        if "activity" in phases:
            activity = re.split("[@|#|,]", text, 1)[0]
            if cls.__looks_like_time(activity):
                # want meaningful activities
                return res

            res["activity"] = activity
            return next_phase(activity, "category")

        if "category" in phases:
            category = re.split("[#|,]", text, 1)[0]
            if category.lstrip().startswith("@"):
                res["category"] = category.lstrip("@ ").strip()
                return next_phase(category, "tags")

            return next_phase("", "tags")

        if "tags" in phases:

            tags, desc = text.rsplit(",", 1) if "," in text else (text, None)

            if '#' in desc:
                tags += ', ' + desc.strip()
                desc = None

            tags = [tag.strip().replace(',', '') for tag in re.split("[#]", tags) if tag.strip()]
            if tags:
                res["tags"] = tags

            if (desc or "").strip():
                res["description"] = desc.strip()

            return res

        return {}
