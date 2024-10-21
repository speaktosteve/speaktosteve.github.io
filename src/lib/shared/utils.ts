export const getIcon = (type: string) => {
    switch (type) {
        case 'external':
            return 'after:content-externalLink';
        case 'repo':
            return 'after:content-github';
        default:
            return '';
    }
};