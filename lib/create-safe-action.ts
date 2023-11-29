import { z } from "zod"

/* Definimos el tipo para los errores de cada input en individual */
export type FieldErrors<T> = {
    [K in keyof T]?: string[]
}

/* Definimos el tipo para los estados de las acciones, las cuales van a tener un parametro de entrada y otro de salida */
export type ActionState<TInput, TOutput> = {
    /* Error por cada input individual */
    fieldErrors?: FieldErrors<TInput>
    /* Errores en la base de datos */
    error?: string | null
    /* La data en caso de que todo salga bien */
    data?: TOutput
}

export const createSafeAction = <TInput, TOutput>(
    schema: z.Schema<TInput>,
    handler: (validationData: TInput) => Promise<ActionState<TInput, TOutput>>
) => {
    return async(data: TInput): Promise<ActionState<TInput, TOutput>> => {
        const validationResult = schema.safeParse(data)

        if(!validationResult.success){
            return {
                fieldErrors: validationResult.error.flatten().fieldErrors as FieldErrors<TInput>
            }
        }

        return handler(validationResult.data)
    }
}
