from flask import *
import ibm_db
import os
import ibm_boto3
import requests
from ibm_botocore.client import Config,ClientError

RAPIDAPI_KEY='14588b1906msh694e5a23c7c3fd6p179388jsn30d3c3165ac8'
conn=ibm_db.connect("DATABASE=bludb;HOSTNAME=815fa4db-dc03-4c70-869a-a9cc13f33084.bs2io90l08kqb1od8lcg.databases.appdomain.cloud;PORT=30367;SECURITY=SSL;SSLServerCertificate=DigiCertGlobalRootCA.crt;UID=xpt33293;PWD=WLLDbJaGqMT2yahi;",'','')

print(conn)
app=Flask(__name__)
@app.route('/')
def home():
    return render_template("home.html")
@app.route('/about')
def about():
    return render_template("about.html")
@app.route('/')
def welcome():
    return render_template("home.html")
@app.route("/login")
def login():
	return render_template("Login.html")
@app.route("/register")
def register():
	return render_template("Register.html")
@app.route("/register1",methods=["POST"])
def register1():
      x=[x for x in request.form.values()]
      print(x)
      NAME=x[0]
      EMAIL=x[1]
      PASSWORD=x[2]
      sql= "SELECT * FROM REGISTER WHERE EMAIL = ?"
      stmt=ibm_db.prepare(conn,sql)
      ibm_db.bind_param(stmt,1,EMAIL)
      ibm_db.execute(stmt)
      account=ibm_db.fetch_assoc(stmt)
      print(account)
      if account:
            return render_template('Login.html',pred="\nur already a member,please login using ur details")
      else:
            insert_sql="INSERT INTO REGISTER VALUES (?,?,?)"
            prep_stmt=ibm_db.prepare(conn,insert_sql)
            ibm_db.bind_param(prep_stmt,1,NAME)
            ibm_db.bind_param(prep_stmt,2,EMAIL)
            ibm_db.bind_param(prep_stmt,3,PASSWORD)
            ibm_db.execute(prep_stmt)
            return render_template('Login.html',pred="\nRegisteration success please login with ur details")
@app.route("/login1",methods=["POST"])
def login1():
    x=[x for x in request.form.values()]
    print(x)
    EMAIL=x[0]
    PASSWORD=x[1]
    sql="SELECT * FROM REGISTER WHERE EMAIL =? AND PASSWORD =?"
    stmt=ibm_db.prepare(conn,sql)
    ibm_db.bind_param(stmt,1,EMAIL)
    ibm_db.bind_param(stmt,2,PASSWORD)
    ibm_db.execute(stmt)
    account=ibm_db.fetch_assoc(stmt)
    print(account)
    if account:
        return render_template('welcome.html',pred="Successfully login to the web page")
    else:
        return render_template('home.html',pred="ur account not exist please register")
        
@app.route("/result")
def result():
	return render_template("result.html")  
@app.route("/beauty")
def beauty():
	return render_template("beauty.html") 
app.route("/beauty1",methods=['GET','POST'])
def beauty1():
    if request.method == 'POST':
        uploaded_file = request.files['file']
        url = "https://ai-skin-beauty.p.rapidapi.com/face/editing/retouch-skin"
        headers = {
            "X-RAPIDAPI-Host": "http://ai-skin-beauty.p.rapidapi.com",
            "X-RAPIDAPI-Key": "14588b1906msh694e5a23c7c3fd6p179388jsn30d3c3165ac8"
        }
        files = {'image': (uploaded_file.filename, uploaded_file.stream, uploaded_file.content_type)}
        response = requests.post(url, headers=headers, files=files)

        # Save the processed image locally (optional)
        processed_image_filename = 'processed_image.png'
        with open(processed_image_filename, 'wb') as f:
            f.write(response.content)

        # Render the HTML template with the processed image
        return render_template('beauty.html', processed_image_filename=processed_image_filename)
    return render_template('beauty.html')

@app.route("/removebg")
def removebg():
	return render_template("removebg.html")    
@app.route("/result1",methods=["POST","GET"])
def result1():
    if request.method=='POST':
        f=request.files['image']
        basepath=os.path.dirname(__file__)
        #print("current path",basepath)
        filepath=os.path.join(basepath,'uploads',f.filename)
        f.save(filepath)
        COS_ENDPOINT = "https://s3.us-south.cloud-object-storage.appdomain.cloud"
        COS_API_KEY_ID = "6JufmiNXRnAVNJGnDCc_r5ldEvIX4rA-hmFIbsCQVdyq"
        COS_INSTANCE_CRN = "crn:v1:bluemix:public:cloud-object-storage:global:a/6e1c81b6d7db44c48d57821a190dd3f8:3578e2b5-796c-4e90-9f6d-6bbe875feac9::"
        cos = ibm_boto3.client("s3",ibm_api_key_id=COS_API_KEY_ID,ibm_service_instance_id=COS_INSTANCE_CRN, config=Config(signature_version= "oauth"),endpoint_url=COS_ENDPOINT)
        cos.upload_file(Filename=filepath,Bucket="srinivash",Key='cad.jpg')
    return "Image Upload Success"



if __name__=="__main__":
    app.run(debug= True,port = 5000)