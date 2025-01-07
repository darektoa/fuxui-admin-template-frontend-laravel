import upper from '../upper';

const upperFirst = (text: string | null | undefined) => {
    if(!text) return '';
    return `${upper(text?.[0])}${text?.slice(1)}`;
}

export default upperFirst;
