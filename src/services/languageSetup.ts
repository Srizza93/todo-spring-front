export function convertLanguage(lang: string): string {
    switch (lang) {
        case 'en':
            return 'en-GB'
        case 'en-GB':
            return 'en-GB'
        case 'en-US':
            return 'en-GB'
        case 'en-AU':
            return 'en-GB'
        case 'en-CA':
            return 'en-GB'
        case 'en-IN':
            return 'en-GB'
        case 'en-ZA':
            return 'en-GB'
        case 'fr':
            return 'fr-FR'
        case 'fr-FR':
            return 'fr-FR'    
        case 'fr-CA':
            return 'fr-FR'    
        case 'fr-BE':
            return 'fr-FR'    
        case 'fr-CH':
            return 'fr-FR'    
        default:
            return 'en-GB'
        
    }
} 