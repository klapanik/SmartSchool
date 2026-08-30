export interface User {
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string | null;
    avatar: string | null;

    form: string;
    letter: string;

    parent_first_name: string | null;
    parent_last_name: string | null;

    class_teacher_first_name: string | null;
    class_teacher_last_name: string | null;
}
