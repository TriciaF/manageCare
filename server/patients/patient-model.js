'use strict';

const { Patients } = require('./patient-schema');

const patients = {
	create: function(patientName, medication) {
		console.log('Enter Patients:create');
		const meds = medication.map(item => {
			return item;
		});
		return Patients
			.create({
				name: { firstname: patientName.firstname, lastname: patientName.lastname },
				medication: meds
			});
	},

	get: function(id = null) {
		console.log('Enter Patients:Get');
		if (id === null) {
			return Patients.find();
		} else
			return Patients.findById(id);
	},

	update: function(id, patientName, medication, pharmacy, physician) {
		console.log('Enter Patients:Update');
		console.log(id);
		const updateObj = {
			name: { firstname: patientName.firstname, lastname: patientName.lastname },
			medication: [{
				name: medication.name,
				dosage: medication.dosage,
				schedule: medication.schedule,
				pharmacy: {
					name: pharmacy.name,
					address: pharmacy.address,
					phoneNumber: pharmacy.phoneNumber
				},
				physician: {
					name: physician.name,
					address: physician.address,
					phoneNumber: physician.phoneNumber
				},
			}]
		};
		console.log(updateObj);
		return Patients
			.findByIdAndUpdate(id, { $set: updateObj });
	},

	delete: function(id) {
		console.log('Enter Patients:Delete');
		return Patients
			.findByIdAndRemove(id);
	}
};

module.exports = { patients };