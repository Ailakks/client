import React, { createContext } from 'react';

export const FormContext = createContext(null);

interface Props extends React.FormHTMLAttributes<HTMLFormElement> {
    onSubmit: (data: FormData) => Promise<void>;
}

export default class Form extends React.Component<Props, any> {
    private readonly ref: RefObject<HTMLFormElement>;

    constructor(props: Props) {
        super(props);

        this.ref = React.createRef();
    }

    handle = async (event: React.FormEvent<HTMLFormElement>) => {
        const { onSubmit } = this.props;

        event.preventDefault();

        if (this.ref.current) {
            const data = new FormData(this.ref.current);

            await onSubmit(data);
        }
    };

    render() {
        const { children, ...props } = this.props;

        return (
            <FormContext.Provider value={{ submit: this.submit }}>
                <form ref={this.ref} onSubmit={this.handle} {...props}>
                    {children}
                </form>
            </FormContext.Provider>
        );
    }
}
