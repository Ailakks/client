import React  from 'react';
import {FormContext} from "./Form";

interface Props extends React.FormHTMLAttributes<HTMLInputElement> {
}

export class Input extends React.Component<Props, any> {
    static contextType = FormContext;

    handleChange = (event) => {
        const { form, set } = this.context;

        set({ ...form, [event.target.name]: event.target.value });
    };

    render() {
        const { ...props } = this.props;

        return (
            <input onChange={this.handleChange} {...props} />
        );
    }
}
