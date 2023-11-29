"use client"

import { forwardRef } from "react"
import { useFormStatus } from "react-dom"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { cn } from '@/lib/utils';
import FormErrors from "./form-errors"

interface FormInputProps {
    id: string
    label?: string
    type?: string
    placeholder?: string
    required?: boolean
    disabled?: boolean
    errors?: Record<string, string[] | undefined>
    className?: string
    defaultValue?: string
    onBlur?: () => void
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(({ id, label, type, placeholder, required, disabled, errors, className, defaultValue = "", onBlur }, ref) => {

    const { pending } = useFormStatus()

    return (
        <div className="space-y-2">
            <div className="space-y-1">
                {
                    label
                    ? (
                        <Label
                            htmlFor={id}
                            className="text-xs font-semibold text-neutral-700"
                        >
                            { label }
                        </Label>
                    )
                    : null
                }
                <Input
                    id={id}
                    name={id}
                    placeholder={placeholder}
                    required={required}
                    type={type}
                    disabled={pending || disabled}
                    defaultValue={defaultValue}
                    onBlur={onBlur}
                    ref={ref}
                    className={cn(
                        "text-sm px-2 py-1 h-7",
                        className
                    )}
                    aria-describedby={`${id}-error`}
                />
            </div>
            <FormErrors
                id={id}
                errors={errors}
            />
        </div>
    )
})

export default FormInput

/* Cuando usamos forwardRef necesitamos definir el displayName */
FormInput.displayName = "FormInput"
