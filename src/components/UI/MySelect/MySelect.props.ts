import { ChangeEvent, SelectHTMLAttributes } from "react";

export interface MySelectProps extends SelectHTMLAttributes<HTMLSelectElement>{
    options: string[];
    defaultValue: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}