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