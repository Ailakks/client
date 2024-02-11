import React  from 'react';
import {FormContext} from "./form";

interface Props extends React.FormHTMLAttributes<HTMLInputElement> {
}

export default class Input extends React.Component<Props, any> {
    static contextType = FormContext;

    handleChange = (event) => {
        const { form } = this.context;

        form({ form: { ...form, [event.target.name]: event.target.value } });
    };

    render() {
        const { ...props } = this.props;

        return (
            <input onChange={this.handleChange} {...props} />
        );
    }
}
