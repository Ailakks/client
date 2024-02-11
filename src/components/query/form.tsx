import React, { createContext } from 'react';

export const FormContext = createContext(null);

interface Props extends React.FormHTMLAttributes<HTMLFormElement> {
    onSubmit: (data: FormData) => Promise<void>;
}

export default class Form extends React.Component<Props, any> {
    private readonly ref: RefObject<HTMLFormElement>;

    constructor(props: Props) {
        super(props);

        this.state = { form: null };

        this.ref = React.createRef();
    }

    submit = async (event: React.FormEvent<HTMLFormElement>) => {
        const { onSubmit } = this.props;
        const { form } = this.state;

        event.preventDefault();

        await onSubmit(form);
    };

    set = async (data) => {
        this.setState(data);
    };

    render() {
        const { children, ...props } = this.props;

        return (
            <FormContext.Provider value={{ form: this.set, submit: this.submit }}>
                <form ref={this.ref} onSubmit={this.submit} {...props}>
                    {children}
                </form>
            </FormContext.Provider>
        );
    }
}
