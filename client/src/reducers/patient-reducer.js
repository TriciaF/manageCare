import {
    PATIENTLIST_REQUEST_SENT,
    GET_PATIENTLIST_SUCCESS,
    GET_PATIENTLIST_ERROR,
    SHOW_PATIENT_DASHBOARD,
    SET_PATIENT_DASHBOARD,
    GET_PATIENT_DASHBOARD,
    UPDATE_PATIENT_SUCCESS,
    UPDATE_PATIENT_ERROR,
    ADD_MEDICATION,
    REMOVE_MEDICATION,
    SHOW_MEDS_ADD_FORM,
    ADD_NEW_PATIENT,
    SHOW_ADD_PATIENT_FORM,
    SHOW_PATIENT_LIST
} from '../actions/patient';

const initialState = {
    loading: false,
    error: null,
    patientList: [],
    showPatientDashboard: false,
    showPatientList: false,
    currentPatient: null,
    patientDashboard: null,
    showMedsAddForm: false,
    removeMedication: false,
    addPatient: false,
    showAddPatientForm: false,
    addMedication: false,
};


export default function reducer(state = initialState, action) {
    if (action.type === PATIENTLIST_REQUEST_SENT) {
        return Object.assign({}, state, {
            loading: true
        });
    } else if (action.type === GET_PATIENTLIST_SUCCESS) {
        console.log('enter getPatientListSuccess', action.patientList);
        return Object.assign({}, state, {
            patientList: action.patientList,
            loading: false
        });
    } else if (action.type === GET_PATIENTLIST_ERROR) {
        return Object.assign({}, state, {
            error: action.error
        });
    } else if (action.type === SHOW_PATIENT_DASHBOARD) {
      console.log('enter showPatientDashboard')
        return Object.assign({}, state, {
            showPatientDashboard: true,
            showPatientList: false
        });
    } else if (action.type === SET_PATIENT_DASHBOARD) {
      console.log('Enter set patient Dashboard: ', action)
      return Object.assign({}, state, {
          currentPatient: action.currentPatient,
          patientDashboard: {
              id: action.patientDashboard.id,
              name: action.patientDashboard.name,
              medication: action.patientDashboard.medication.map(med => {
                  return med;
              })
          }
      });
    } else if (action.type === GET_PATIENT_DASHBOARD) {
        console.log(state.patientDashboard)
        return state.patientDashboard

    } else if (action.type === UPDATE_PATIENT_SUCCESS) {
      console.log('enter updatePatientSuccess')
        return Object.assign({}, state, {
            error: false,
            addMedication: false,
            addPatient: false
        });
    } else if (action.type === UPDATE_PATIENT_ERROR) {
        return Object.assign({}, state, {
            error: action.error
        });
    } else if (action.type === SHOW_ADD_PATIENT_FORM) {
      console.log('Enter showAddPatientForm action')
        return Object.assign({}, state, {
          showAddPatientForm: true,
          showPatientDashboard: false
        });
    } else if (action.type === SHOW_PATIENT_LIST) {
      console.log('Enter showPatientList')
        return Object.assign({}, state, {
          showPatientList: true,
          showPatientDashboard: false,
        });
    } else if (action.type === ADD_MEDICATION) {
        console.log("Enter AddMedication action = ", action)
        return Object.assign({}, state, {
            addMedication: true,
            showMedsAddForm: false,
            patientDashboard: {
                id: state.patientDashboard.id,
                name: state.patientDashboard.name,
                medication: state.patientDashboard.medication.concat([{
                    name: action.patientDashboard.medName,
                    dosage: action.patientDashboard.medDosage,
                    schedule: action.patientDashboard.medSchedule,
                    pharmacy: {
                        name: action.patientDashboard.pharmName,
                        address: action.patientDashboard.pharmAddr,
                        phoneNumber: action.patientDashboard.pharmPhone
                    },
                    physician: {
                        name: action.patientDashboard.physicianName,
                        address: action.patientDashboard.physicianAddr,
                        phoneNumber: action.patientDashboard.physicianPhone
                    }
                }])
            }
        });
    } else if (action.type === REMOVE_MEDICATION) {
        console.log('Enter removeMedication action ', action);
        const meds = state.patientDashboard.medication.filter(med => {
            return med.name !== action.patientDashboard.name
        })
        console.log('This is the meds array: ', meds);
        return Object.assign({}, state, {
            removeMedication: true,
            patientDashboard: {
                id: state.patientList.id,
                name: state.patientList.name,
                medication: meds
            }
        });
    } else if (action.type === SHOW_MEDS_ADD_FORM) { 
        console.log('Enter showAddMedicationForm = ')
        return Object.assign({}, state, {
            showMedsAddForm: true,
            showPatientDashboard: false
        });
    } else if (action.type === ADD_NEW_PATIENT) {
        console.log('Enter AddNewPatient action = ', action);
        if (!state.addPatient) {
            return Object.assign({}, state, {
                showAddPatientForm: true,
                addPatient: true
            })
        } else {
            return Object.assign({}, state, {
                addPatient: false,
                showAddPatientForm: false,
                patientList: state.patientList.concat([{
                    name: action.patientList.name,
                    medication: {
                        name: action.patientList.medication.medName,
                        dosage: action.patientList.medication.medDosage,
                        schedule: action.patientList.medication.medSchedule,
                        pharmacy: {
                            name: action.patientList.medication.pharmName,
                            address: action.patientList.medication.pharmAddr,
                            phoneNumber: action.patientList.medication.pharmPhone
                        },
                        physician: {
                            name: action.patientList.medication.physicianName,
                            address: action.patientList.medication.physicianAddr,
                            phoneNumber: action.patientList.medication.physicianPhone
                        }
                    }
                }])
            });
        }
    } else
        return state;

} //end patientReducer