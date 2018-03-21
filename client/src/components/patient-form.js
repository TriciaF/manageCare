import React from 'react';
import '../index.css';
import {Field, reduxForm, focus} from 'redux-form';
import {required, nonEmpty} from '../validators';
import PatientInput from './patient-input';
import {addNewPatient} from '../actions/patient';

export class PatientForm extends React.Component {

  onSubmit(values) {
    return this.props.dispatch(addNewPatient(values))
}

render() {
console.log('Enter PatientForm')
    let error;
    if (this.props.error) {
        error = (
            <div className="form-error" aria-live="polite">
                {this.props.error}
            </div>
        );
    }
    return (
        <form
            className="add-patient-form"
            onSubmit={this.props.handleSubmit(values =>
              this.onSubmit(values)
          )}>
            {error}
            <Field
                component={PatientInput}
                type="text"
                name="name"
                id="patientName"
                placeholder="patient name"
                validate={[required, nonEmpty]}
            />
            <Field
                component={PatientInput}
                type="medication"
                name="medication"
                id="medName"
                placeholder="medication"
                validate={[required, nonEmpty]}
            />
            <Field
                component={PatientInput}
                type="dosage"
                name="dosage"
                id="medDosage"
                placeholder="dosage"
            />
            <Field
                component={PatientInput}
                type="schedule"
                name="schedule"
                id="medSchedule"
                placeholder="schedule"
            />
            <Field
                component={PatientInput}
                type="pharmacyName"
                name="pharmacyName"
                id="pharmName"
                placeholder="pharmacy name"
            />
            <Field
                component={PatientInput}
                type="pharmacyAddr"
                name="pharmacyAddr"
                id="pharmAddr"
                placeholder="pharmacy address"
            />
            <Field
                component={PatientInput}
                type="pharmacyPhone"
                name="pharmacyPhone"
                id="pharmPhone"
                placeholder="pharmacy phone number"
            />
            <Field
                component={PatientInput}
                type="physicianName"
                name="physicianName"
                id="physicianName"
                placeholder="physician's name"
            />
            <Field
                component={PatientInput}
                type="physicianAddr"
                name="physicianAddr"
                id="physicianAddr"
                placeholder="physician's address"
            />
            <Field
                component={PatientInput}
                type="physicianPhone"
                name="physicianPhone"
                id="physicianPhone"
                placeholder="physician's phone number"
            />
            <button className='submit-add-patient-button' disabled={this.props.pristine || this.props.submitting}>
                Submit
            </button>
        </form>
    );
}
}

  export default reduxForm({
    form: 'patientForm',
    onSubmitFail: (errors, dispatch) => dispatch(focus('name'))
})(PatientForm);