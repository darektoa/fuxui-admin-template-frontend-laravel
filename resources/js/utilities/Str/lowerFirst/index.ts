import lower from '../lower';

const lowerFirst = (text: string | null | undefined) => {
    if(!text) return '';
    return `${lower(text?.[0])}${text?.slice(1)}`;
}

export default lowerFirst;
