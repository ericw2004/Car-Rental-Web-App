from typing import Union
import mysql.connector
from fastapi import FastAPI
import sys
from typing import Optional

app = FastAPI()
try:
    mydb = mysql.connector.connect(
        host="localhost",
        user="root",
        password="mysqlissecure123!",
        database="rentalapp"
        )
    mycursor = mydb.cursor()
except:
    print("Start the database dummy...")
    sys.exit(0)


@app.get("/")
def read_root():
    if mydb.is_connected():
        return {"Database Connected!"}
    return {"Something is up..."}

@app.get("/cars/")
def get_cars(location_id : int):
    mycursor.execute("select * from cars where location_id = %s", [location_id])
    myresult = mycursor.fetchall()
    return {str(myresult)}

@app.get("/filter/")
def filter(location_id : int, drivetrain : Optional[str] = None, color : Optional[str] = None, make : Optional[str] = None, year : Optional[str] = None):
    list = [location_id, drivetrain, color, make, year]
    included = [item for item in list if item is not None]
    return {str(included)}
    
