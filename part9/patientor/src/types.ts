export type Code = 'M24.2' | 'M51.2' | 'S03.5' | 'J10.1' | 'J06.9' | 'N30.0' | 'H54.7' | 'J03.0'
    | 'L60.1' | 'Z74.3' | 'L20' | 'F43.2' | 'S62.5' | 'H35.29' | 'J12.82'
    | 'Z57.1';

export interface Diagnosis {
    code: Code;
    name: string;
    latin?: string;
}