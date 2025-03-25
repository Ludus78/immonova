/**
 * Valide un email en utilisant une expression régulière stricte et en vérifiant des domaines couramment utilisés pour des emails temporaires ou factices.
 * @param email - L'adresse email à valider
 * @returns Un objet contenant le résultat de validation et un message d'erreur éventuel
 */
export function validateEmail(email: string): { isValid: boolean; message?: string } {
  // Vérifier que l'email n'est pas vide
  if (!email || email.trim() === '') {
    return { isValid: false, message: "L'adresse email est requise" };
  }

  // Expression régulière avancée pour la validation d'email
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  
  if (!emailRegex.test(email)) {
    return { isValid: false, message: "Format d'adresse email invalide" };
  }

  // Liste de domaines couramment utilisés pour les emails jetables ou factices
  const blacklistedDomains = [
    'yopmail.com',
    'tempmail.com',
    'guerrillamail.com',
    'mailinator.com',
    'temp-mail.org',
    'fakeinbox.com',
    'sharklasers.com',
    'jetable.org',
    'dispostable.com',
    'maildrop.cc',
    'mintemail.com',
    'lol.com', // Bloc explicite de lol.com comme demandé
    'example.com',
    'test.com',
  ];

  // Extraire le domaine de l'email
  const domain = email.split('@')[1].toLowerCase();

  // Vérifier si le domaine est dans la liste noire
  if (blacklistedDomains.includes(domain)) {
    return { 
      isValid: false, 
      message: "Veuillez utiliser une adresse email professionnelle. Les emails temporaires ou factices ne sont pas acceptés." 
    };
  }

  // Vérifier les domaines trop courts (probablement inexistants)
  if (domain.length < 4) {
    return { 
      isValid: false, 
      message: "Le domaine de cette adresse email semble invalide" 
    };
  }

  // Vérifier les TLDs (top-level domains) trop courts ou non standard
  const tld = domain.split('.').pop() || '';
  if (tld.length < 2) {
    return { 
      isValid: false, 
      message: "Le domaine de cette adresse email semble invalide" 
    };
  }

  return { isValid: true };
} 