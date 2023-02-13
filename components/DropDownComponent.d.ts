export interface ColourOption {
    readonly value: string;
    readonly label: string;
    readonly color: string;
    readonly isFixed?: boolean;
    readonly isDisabled?: boolean;
}
export declare const DropDownComponent: ({ items, changeHandler, placeholder }: any) => JSX.Element;
