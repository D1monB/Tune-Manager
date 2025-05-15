import { ButtonHTMLAttributes } from "react";

export interface MyButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    variant?: 'primary' | 'ghost' | 'light-green'
    className?: string
}