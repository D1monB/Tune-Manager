import { array, object, string } from "yup";

const requiredMsg = (value: string) => `${value} is a required field`

export const formSchema = object().shape({
    title: string().min(1, "Назва треку обов'язкова").required(requiredMsg('Track Title')),
    artist: string().min(1, "Виконавець обов'язковий").required(requiredMsg('Artist')),
    album: string().notRequired(),
    genres: array().of(string()).min(1, "Should be at least one genre").required(requiredMsg('Genres')),
    coverImage: string().url("Некоректна URL-адреса для обкладинки").notRequired(),
});