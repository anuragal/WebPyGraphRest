import json
import decimal
from datetime import datetime

import psutil

def get_current_cpu_usage():
    cpu_value = psutil.cpu_percent(interval=0)
    data_dict = [{ "key": "cpu", "values": [{"x": datetime.now(), "y": int(cpu_value)}]}]
    return json.dumps(data_dict, cls=CustomJSONEncoder)

def get_current_memory_usage():
    mem_usage = psutil.virtual_memory()
    print approximate_size(mem_usage.used), approximate_size(mem_usage.available)
    data_dict = [{"key": "Used", "values": [{"x": datetime.now(), "y": approximate_size(mem_usage.used)}]},
                    {"key": "Available", "values": [{"x": datetime.now(), "y": approximate_size(mem_usage.available)}]}]
    return json.dumps(data_dict, cls=CustomJSONEncoder)

def approximate_size(size):
    """
    Convert a disk size to human-readable form. This function is used only by EioDiskInfoManager class.
    """
    if size == 0:
        return 0
    SUFFIXES = ['KB', 'MB']
    multiple = 1024.0

    newsize = size
    for suffix in SUFFIXES:
        newsize = size / multiple
        size = newsize
    return newsize
        
class CustomJSONEncoder(json.JSONEncoder):  
    def default(self, obj):
        if isinstance(obj, decimal.Decimal):
            return float(obj)
        if isinstance(obj, datetime):
            return obj.isoformat()

        return super(CustomJSONEncoder, self).default(obj)