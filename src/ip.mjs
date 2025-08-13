import fetch from 'node-fetch';

const ipProviders = [
    'https://ipinfo.io/ip',
    'https://api.ipify.org'
];

/**
 * Determines the ip address using IP providers.
 * It tries each provider in the list until one succeeds.
 * If all providers fail, it throws an error.
 * @return {Promise<string>}
 */
export async function determineIp()
{
    for (const provider of ipProviders) {
        try {
            const resp = await fetch(provider);
            if (resp.ok) {
                const ip = await resp.text();
                return ip.trim();
            }
        } catch (error) {
            console.warn(`Failed to get IP from ${provider}:`, error.message);
        }
    }
    
    throw new Error('All IP providers failed.');
}
