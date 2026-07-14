import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { businessInfo } from '@/data/business';

interface SEOHeadProps {
  title?: string;
  description?: string;
  image?: string;
  type?: 'website' | 'article';
  noIndex?: boolean;
}

export function SEOHead({ 
  title, 
  description,
  image = businessInfo.seo.ogImage,
  type = 'website',
  noIndex = false,
}: SEOHeadProps) {
  const location = useLocation();
  
  const fullTitle = title || `${businessInfo.name} — ${businessInfo.title}`;
  const fullDescription = description || businessInfo.heroDescription;
  const productionUrl = businessInfo.seo.siteUrl;
  const fullUrl = `${productionUrl}${location.pathname === '/' ? '/' : location.pathname}`;
  const fullImageUrl = image.startsWith('http') ? image : `${productionUrl}${image}`;
  const shouldNoIndex = noIndex || window.location.origin !== productionUrl;

  useEffect(() => {
    document.title = fullTitle;

    const updateMetaTag = (name: string, content: string, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    const updateLinkTag = (rel: string, href: string) => {
      let element = document.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
      if (!element) {
        element = document.createElement('link');
        element.setAttribute('rel', rel);
        document.head.appendChild(element);
      }
      element.setAttribute('href', href);
    };

    updateMetaTag('description', fullDescription);
    updateMetaTag('robots', shouldNoIndex ? 'noindex, nofollow' : 'index, follow');
    updateMetaTag('og:title', fullTitle, true);
    updateMetaTag('og:description', fullDescription, true);
    updateMetaTag('og:type', type, true);
    updateMetaTag('og:url', fullUrl, true);
    updateMetaTag('og:image', fullImageUrl, true);
    updateMetaTag('og:site_name', businessInfo.name, true);
    updateMetaTag('og:locale', 'fr_FR', true);
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', fullTitle);
    updateMetaTag('twitter:description', fullDescription);
    updateMetaTag('twitter:image', fullImageUrl);
    updateMetaTag('author', businessInfo.name);
    updateMetaTag('keywords', 'automatisation, solopreneur, indépendant, petites équipes, systèmes opérationnels, facturation, relances, onboarding client, suivi commercial');
    updateLinkTag('canonical', fullUrl);
  }, [fullTitle, fullDescription, fullUrl, fullImageUrl, type, shouldNoIndex]);

  return null;
}
