from odoo import models, fields, api
from odoo.exceptions import ValidationError

class HospitalPatient(models.Model):
    _name = 'hospital.patient'
    _description = 'Hospital Patient'

    name = fields.Char(string='Name', required=True)
    age = fields.Integer(string='Age')
    gender = fields.Selection([
        ('male', 'Male'),
        ('female', 'Female')
    ], string='Gender')

    @api.model
    def create_patient(self, name, age, gender):
        if age < 0:
            raise ValidationError("Age cannot be negative.")
        return self.create({
            'name': name,
            'age': age,
            'gender': gender
        })
    
    def get_patient_above_40(self):
        return self.search([('age', '>', 40)])
    
    def update_patient_age(self, age):
        if age < 0:
            raise ValidationError("Age cannot be negative.")
        self.write({'age': age})

    def delete_patient(self):
        self.unlink()

pantient = [
            {"name": "John", "age": 45, "gender": "male"}, 
            {"name": "Jane", "age": 35, "gender": "female"}, 
            {"name": "Doe", "age": 50, "gender": "male"}
            ]

for p in pantient:
    print(p["name"], p["age"])

filtered = [p for p in pantient if p["age"] > 40]
print(filtered)

avg = sum(p["age"] for p in pantient)/len(pantient)
print(avg)

for p in pantient:
    p["gender"] = "male"
print(pantient)

for p in pantient:
    if p["name"]=="Alice":
        p["name"]="Alicia"

print(pantient[0])

for p in pantient:
    if p["name"].startswith("B"):
        print(p["name"])

pantient = [p for p in pantient if p["age"]>=30]
print(pantient)

def add_patient(lst, name, age, gender):
    lst.append({"name":name,"age":age,"gender":gender})
add_patient(pantient,"Charlie",28,"male")

names = [p["name"] for p in pantient]
print(names)
