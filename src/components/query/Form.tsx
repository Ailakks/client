import React, { createContext } from 'react';

export const FormContext = createContext(null);

interface Props extends React.FormHTMLAttributes<HTMLFormElement> {
    submit: (data: FormData) => Promise<void>;
}

export default class Form extends React.Component<Props, any> {
    private readonly ref: RefObject<HTMLFormElement>;

    constructor(props: Props) {
        super(props);

        this.state = { form: null };

        this.ref = React.createRef();
    }

    submit = async (event: React.FormEvent<HTMLFormElement>) => {
        const { submit } = this.props;
        const { form } = this.state;

        event.preventDefault();

        await submit(form);
    };

    set = async (form) => {
        this.setState({ form });
    };

    render() {
        const { submit, children, ...props } = this.props;

        return (
            <FormContext.Provider value={{ form: this.state.form, set: this.set, submit: this.submit }}>
                <form ref={this.ref} onSubmit={this.submit} {...props}>
                    {children}
                </form>
            </FormContext.Provider>
        );
    }
}
