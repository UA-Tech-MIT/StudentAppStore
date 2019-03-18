from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import create_engine
from sqlalchemy import Column,String,Boolean,DateTime
from sqlalchemy_utils import UUIDType,Timestamp

engine = create_engine()
Base = declarative_base()


class App_Table(Base):
    __tablename__ = "app"
    appHash = Column(UUIDType, primary_key=True)
    name = Column(String,nullable=False)
    isOfficialResource = Column(Boolean,default = False, nullable= False)
    genre = Column(String,nullable = False)
    lastUpdate = Column(DateTime, nullable= False)


class Project_Table(Base):
    __tablename__ = "test"
    appHash = Column(UUIDType, primary_key=True)
    name = Column(String,nullable=False)
    isOfficialResource = Column(Boolean,default = False, nullable= False)
    genre = Column(String,nullable = False)
    lastUpdate = Column(DateTime, nullable= False)

class Stuff_ToDo_Table(Base):
    __tablename__ = "cool"
    appHash = Column(UUIDType, primary_key=True)
    name = Column(String,nullable=False)
    isOfficialResource = Column(Boolean,default = False, nullable= False)
    genre = Column(String,nullable = False)
    lastUpdate = Column(DateTime, nullable= False)