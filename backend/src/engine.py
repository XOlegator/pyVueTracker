from backend.src.model.hamster import Fact
from backend.src.model.mysql import db, User, Activity, Task, HashTag, Project
from backend.src.auth import Auth
import re, datetime


class FactTask(object):
    def __init__(self):
        self.activity_id = None  # активность
        self.category = None  # проект
        self.date = None  # дата
        self.delta = None
        self.description = None
        self.end_time = None
        self.id = None
        self.name = None
        self.start_time = None
        self.end_time = None
        self.tag = None
        self.tags = None


class Engine(object):
    def __init__(self):
        self.user_id = Auth.get_token_id(Auth.get_request_token())
        self.user = db.session.query(User).filter(User.id == self.user_id)

    def __get_task_by_external_id(self, external_task_id):
        return db.session.query(Task.id).filter(Task.external_task_id == external_task_id).first()

    def __get_project_by_name(self, project_name):
        return db.session.query(Project.id) \
            .join(User.projects) \
            .filter(Project.title == project_name) \
            .filter(User.id == self.user_id).first()

    def add_fact(self, fact: Fact):
        """
        Добавляет факт в БД, добавляет недостающие теги, проставляет связи
        :param fact:
        :return:
        """
        new_activity = Activity()

        # user_id
        if self.user_id is None:
            return False, 'нет пользователя с таким токеном'
        new_activity.user_id = self.user_id

        # task_id
        external_task_id = fact.get_task_id()
        if external_task_id is None:
            return False, 'не указан номер задачи'
        task = self.__get_task_by_external_id(external_task_id)
        if task is None:
            if fact.category is None:
                return False, 'не указан проект для новой задачи'
            project = self.__get_project_by_name(fact.category)
            if project is None:
                return False, 'среди ваших проектов нет проекта ' + fact.category
            task = Task(external_task_id=external_task_id, project_id=project.id)
            db.session.add(task)
            db.session.commit()
        new_activity.task_id = task.id

        # name
        name = re.findall('^\d* (.*)', fact.activity).pop().strip()
        if name is not False and name != '':
            new_activity.name = name

        # comment
        if fact.description is not None:
            new_activity.comment = fact.description

        # time_start
        new_activity.time_start = fact.start_time

        # time_end
        if fact.end_time is not None:
            new_activity.time_end = fact.end_time

        # last_updated
        new_activity.last_updated = datetime.datetime.now()

        # tags
        if fact.tags is not None:
            tags = db.session.query(HashTag).filter(HashTag.name.in_(fact.tags)).all()

            tag_names = set()
            for tag in tags:
                tag_names.add(tag.name)
                new_activity.hashtags.append(tag)

            new_tags = set(fact.tags) - tag_names
            for tag in new_tags:
                new_activity.hashtags.append(HashTag(name=tag))

        db.session.add(new_activity)
        db.session.commit()
        return True, None

    def get_facts(self):
        facts = {
            "tasks": [
                {
                    "activity_id": 2119,
                    "category": "asdd ",
                    "date": "21.12.2018",
                    "delta": 0.4,
                    "description": null,
                    "end_time": "",
                    "id": 10199,
                    "name": "12345 asddasd",
                    "start_time": "11:40",
                    "end_time": "12:00",
                    "tag": "one",
                    "tags": [
                        "one",
                        "two"
                    ]
                }
            ]
        }