'use client'

import type { ComponentProps } from 'react';
import type { VariantProps } from 'tailwind-variants';

import { createContext, useContext, useMemo, useState } from 'react'
import { tv, cn } from 'tailwind-variants';

import { Label } from '../label'
import { Separator } from '../separator'

const field = tv({
    slots: {
        main: 'data-[invalid=true]:text-red-500 gap-2 group/field flex w-full',
    },
    variants: {
        color: {
            default: {},
            primary: {},
            secondary: {},
        },
        orientation: {
            vertical: {
                main: [
                    'flex-col',
                    '*:w-full',
                    '[&>.sr-only]:w-auto'
                ],
            },
            horizontal: {
                main: [
                    'flex-row',
                    'items-center',
                    'has-[>[data-slot=field-content]]:items-start',
                    '*:data-[slot=field-label]:flex-auto',
                    'has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px'
                ],
            },
            responsive: {
                main: [
                    'flex-col',
                    '*:w-full',
                    '@md/field-group:flex-row',
                    '@md/field-group:items-center',
                    '@md/field-group:*:w-auto',
                    '@md/field-group:has-[>[data-slot=field-content]]:items-start',
                    '@md/field-group:*:data-[slot=field-label]:flex-auto',
                    '[&>.sr-only]:w-auto',
                    '@md/field-group:has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px'
                ]
            }
        },
    },
    defaultVariants: {
        orientation: 'vertical',
        color: 'primary',
    },
});

type FieldVariants = VariantProps<typeof field>;

type FieldContextProps = FieldVariants & {
    focus: boolean;
    invalid: boolean;
    required: boolean;
};

const FieldContext = createContext<FieldContextProps>({
    color: 'primary',
    orientation: 'vertical',
    focus: false,
    invalid: false,
    required: false,
});

function useField() {
    const context = useContext(FieldContext);
    if (!context) {
        throw new Error('useField must be used within a Field');
    }

    return context;
}

type FieldSetProps = ComponentProps<'fieldset'>;

function FieldSet({ className, ...props }: FieldSetProps) {
    return (
        <fieldset
            data-slot="field-set"
            className={cn("gap-4 has-[>[data-slot=checkbox-group]]:gap-3 has-[>[data-slot=radio-group]]:gap-3 flex flex-col", className)}
            {...props}
        />
    )
}

type FieldLegendProps = ComponentProps<'legend'> & {
    variant?: "legend" | "label";
};

function FieldLegend({
    className,
    variant = "legend",
    ...props
}: FieldLegendProps) {
    return (
        <legend
            data-slot="field-legend"
            data-variant={variant}
            className={cn("mb-1.5 font-medium data-[variant=label]:text-sm data-[variant=legend]:text-base", className)}
            {...props}
        />
    )
}

function FieldGroup({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="field-group"
            className={cn(
                "gap-5 data-[slot=checkbox-group]:gap-3 *:data-[slot=field-group]:gap-4 group/field-group @container/field-group flex w-full flex-col",
                className
            )}
            {...props}
        />
    )
}

type FieldProps = ComponentProps<'div'> & FieldVariants & {
    required?: boolean;
    'data-invalid'?: boolean;
};

function Field({
    className,
    orientation = "vertical",
    color,
    required = false,
    ...props
}: FieldProps) {
    const { main } = field();

    const [focus, setFocus] = useState(false);

    const invalid = props['data-invalid'] as boolean;

    return (
        <FieldContext.Provider value={{ color, orientation, focus, invalid, required }}>
            <div
                {...props}
                role='group'
                data-slot='field'
                data-orientation={orientation}
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
                className={main({
                    className,
                    color,
                    orientation,
                })}
            />
        </FieldContext.Provider>
    )
}

type FieldContentProps = ComponentProps<'div'>;

function FieldContent({
    className,
    ...props
}: FieldContentProps) {
    return (
        <div
            data-slot="field-content"
            className={cn(
                "gap-0.5 group/field-content flex flex-1 flex-col leading-snug",
                className
            )}
            {...props}
        />
    )
}

type FieldLabelProps = ComponentProps<typeof Label>;

function FieldLabel({
    className,
    children,
    ...props
}: FieldLabelProps) {
    const field = useField();

    return (
        <Label
            {...props}
            {...field}
            data-slot="field-label"
            className={cn(
                'ml-2',
                "has-data-checked:bg-primary/5 has-data-checked:border-primary/30 dark:has-data-checked:border-primary/20 dark:has-data-checked:bg-primary/10 gap-2 group-data-[disabled=true]/field:opacity-50 has-[>[data-slot=field]]:rounded-lg has-[>[data-slot=field]]:border *:data-[slot=field]:p-2.5 group/field-label peer/field-label flex w-fit leading-snug",
                "has-[>[data-slot=field]]:w-full has-[>[data-slot=field]]:flex-col",
                className
            )}
        >
            {children}
            {field.required && <span className='text-red-500'>*</span>}
        </Label>
    )
}

type FieldTitleProps = ComponentProps<'div'>;

function FieldTitle({
    className,
    ...props
}: FieldTitleProps) {
    return (
        <div
            data-slot="field-label"
            className={cn(
                "gap-2 text-sm font-medium group-data-[disabled=true]/field:opacity-50 flex w-fit items-center leading-snug",
                className
            )}
            {...props}
        />
    )
}

type FieldDescriptionProps = ComponentProps<'p'>;

function FieldDescription({
    className,
    ...props
}: FieldDescriptionProps) {
    return (
        <p
            data-slot="field-description"
            className={cn(
                "text-muted-foreground text-left text-sm [[data-variant=legend]+&]:-mt-1.5 leading-normal font-normal group-has-data-horizontal/field:text-balance",
                "last:mt-0 nth-last-2:-mt-1",
                "[&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-primary",
                className
            )}
            {...props}
        />
    )
}

type FieldSeparatorProps = ComponentProps<'div'> & {
    children?: React.ReactNode
};

function FieldSeparator({
    children,
    className,
    ...props
}: FieldSeparatorProps) {
    return (
        <div
            data-slot="field-separator"
            data-content={!!children}
            className={cn("-my-2 h-5 text-sm group-data-[variant=outline]/field-group:-mb-2 relative", className)}
            {...props}
        >
            <Separator className="absolute inset-0 top-1/2" />
            {children && (
                <span
                    className="text-muted-foreground px-2 relative mx-auto block w-fit bg-background"
                    data-slot="field-separator-content"
                >
                    {children}
                </span>
            )}
        </div>
    )
}

type FieldErrorProps = ComponentProps<'div'> & {
    errors?: Array<{ message?: string } | undefined>
};

function FieldError({
    className,
    children,
    errors,
    ...props
}: FieldErrorProps) {
    const content = useMemo(() => {
        if (children) {
            return children
        }

        if (!errors?.length) {
            return null
        }

        const uniqueErrors = [
            ...new Map(errors.map((error) => [error?.message, error])).values(),
        ]

        if (uniqueErrors?.length == 1) {
            return uniqueErrors[0]?.message
        }

        return (
            <ul className="ml-4 flex list-disc flex-col gap-1">
                {uniqueErrors.map(
                    (error, index) =>
                        error?.message && <li key={index}>{error.message}</li>
                )}
            </ul>
        )
    }, [children, errors])

    if (!content) {
        return null
    }

    return (
        <div
            role="alert"
            data-slot="field-error"
            className={cn("text-destructive text-xs font-normal", className)}
            {...props}
        >
            {content}
        </div>
    )
}

export {
    Field,
    FieldLabel,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLegend,
    FieldSeparator,
    FieldSet,
    FieldContent,
    FieldTitle,
}
