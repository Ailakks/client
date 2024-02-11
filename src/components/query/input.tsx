import React  from 'react';

interface Props extends React.FormHTMLAttributes<HTMLInputElement> {
}

export default class Input extends React.Component<Props, any> {
    static contextType = FormContext;

    handleChange = (event) => {
        const { form, setForm } = this.context;

        setForm({ ...form, [event.target.name]: event.target.value });
    };

    render() {
        const { ...props } = this.props;

        return (
            <input onChange={this.handleChange} {...props} />
        );
    }
}
