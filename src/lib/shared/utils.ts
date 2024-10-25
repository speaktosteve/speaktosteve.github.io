export const getIcon = (type: string) => {
    switch (type) {
        case 'external':
            return 'after:content-externalLink dark:after:content-externalLinkDark';
        case 'repo':
            return 'after:content-github dark:after:content-githubDark';
        default:
            return '';
    }
};