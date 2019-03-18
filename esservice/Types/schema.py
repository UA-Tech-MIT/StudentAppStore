from marshmallow_sqlalchemy import ModelSchema
from marshmallow.fields import UUID
from Types.model import App_Table

class App_Schema(ModelSchema):
    id = UUID(attribute="appHash")
    class Meta:
        model = App_Table

class Project_Schema(ModelSchema):

    class Meta:
        model = App_Table


class Stuff_ToDo_Schema(ModelSchema):
    class Meta:
        model = App_Table


