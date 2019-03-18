import schedule
import inspect
import Types.model
import Types.schema
import sys
from sqlalchemy.orm import sessionmaker
import datetime

from elasticsearch import Elasticsearch

es = Elasticsearch()

session = sessionmaker(bind = Types.model.engine)
classes = []
def UpdateElasticSearch():
    objects_to_update = []
    for obj in classes:
      objects_to_update.extend(session.query(obj).filter(obj.lastUpdate <= getLastUpdate()))

    elastic_search_index = []
    for obj in objects_to_update:
        #creates a schema for each object to dump to elastic search
        schema = get_Schema_From_Table(obj)()
        result = schema.dump(obj)
        elastic_search_index.append({"index":{"_index":obj.__name__.replace("_Table","").lower(),"_type":"_doc"},"_id":result.id})
        elastic_search_index.append(result)

    es.bulk(elastic_search_index)




def getLastUpdate():
    return datetime.datetime.now()

def setLastUpadate():
    pass
#schedule.every(23).to(25).hours.do(FindUpdates())


for name, obj in inspect.getmembers(Types.model):
    if inspect.isclass(obj) and "_Table" in name :
        classes.append(obj)

def get_Schema_From_Table(Table):
    return getattr(sys.modules["Types.schema"],Table.__name__.replace("_Table","_Schema"))

