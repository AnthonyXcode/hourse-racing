// Footer + legal pages. Each page: title, intro, sections[{ heading, body: paragraphs[] }].
// A body string starting with "• " renders as a bullet item.
// Placeholders filled at render: {{company}}, {{email}}, {{address}}, {{appName}}.
export const legal = {
  footer: {
    copyright: "Copyright © {{year}} {{company}}. All rights reserved.",
    nav: "Legal",
    privacy: "Privacy Policy",
    terms: "Terms of Use",
    sales: "Sales and Refunds",
    legal: "Legal",
    sitemap: "Site Map",
  },
  updated: "Last updated: {{date}}",
  privacy: {
    title: "Privacy Policy",
    intro:
      "{{company}} (\"we\", \"us\") operates {{appName}}. This policy explains what personal data we collect, why we collect it, and the choices you have. We handle personal data in accordance with the Personal Data (Privacy) Ordinance (Cap. 486) of Hong Kong.",
    sections: [
      {
        heading: "Personal data we collect",
        body: [
          "We collect only what we need to run the service:",
          "• Account and contact details, such as your name and email address, once you create an account.",
          "• Subscription and billing records, such as your plan, payment dates and amounts. Card details are entered with and processed by our payment processor; we do not receive or store your full card number.",
          "• Technical and usage information, such as IP address, browser type, pages viewed and error logs, which our servers record automatically.",
        ],
      },
      {
        heading: "Cookies and local storage",
        body: [
          "{{appName}} currently uses only cookies or similar technologies that are strictly necessary for the site to work. Your language choice is kept in the page address (URL), not in a cookie. If we introduce analytics or other non-essential cookies, we will update this policy and ask for your consent where required.",
        ],
      },
      {
        heading: "Why we use your data",
        body: [
          "• To provide, maintain and secure the service and your account.",
          "• To process subscriptions and payments, and to handle refunds and billing questions.",
          "• To answer your enquiries and send you service notices, such as changes to these terms or your subscription.",
          "• To understand how the service is used and to improve it, using aggregated information wherever possible.",
        ],
      },
      {
        heading: "Direct marketing",
        body: [
          "We will only use your personal data for direct marketing if you have given your consent, as required by Part 6A of the Personal Data (Privacy) Ordinance. You can withdraw your consent at any time, free of charge, by using the unsubscribe link in our messages or by emailing {{email}}.",
        ],
      },
      {
        heading: "Who we share data with",
        body: [
          "We do not sell your personal data. We share it only with:",
          "• Our payment processor, to take payments and prevent fraud.",
          "• Hosting, IT and email providers who process data on our behalf and under our instructions.",
          "• Law enforcement, regulators or courts, where we are required or permitted by law to do so.",
        ],
      },
      {
        heading: "Storage outside Hong Kong",
        body: [
          "Some of our service providers may store or process data outside Hong Kong. Where this happens, we take reasonable steps to ensure your data receives a level of protection comparable to that under Hong Kong law.",
        ],
      },
      {
        heading: "How long we keep data",
        body: [
          "We keep personal data only for as long as needed for the purposes above. Billing records are kept for as long as required for accounting and tax purposes. When data is no longer needed, we delete or anonymise it.",
        ],
      },
      {
        heading: "Security",
        body: [
          "We use reasonable technical and organisational measures to protect personal data against unauthorised access, loss or misuse, including encrypted connections and restricted access. No online service can be completely secure, so please keep your account details safe.",
        ],
      },
      {
        heading: "Your rights",
        body: [
          "You have the right to ask whether we hold your personal data, to request a copy of it, and to ask us to correct it if it is inaccurate. To make a data access or correction request, email {{email}}. We will respond within the time required by law and may charge a fee that is not excessive for a data access request.",
        ],
      },
      {
        heading: "Under-18s",
        body: [
          "{{appName}} is intended only for people aged 18 or over. We do not knowingly collect personal data from anyone under 18. If you believe a minor has given us personal data, please contact us and we will delete it.",
        ],
      },
      {
        heading: "Changes to this policy",
        body: [
          "We may update this policy from time to time. The date at the top shows when it was last changed. If we make significant changes, we will tell you through the service or by email.",
        ],
      },
      {
        heading: "Contact us",
        body: ["For privacy questions or requests, contact our data protection contact at {{email}}, or write to {{company}}, {{address}}."],
      },
    ],
  },
  terms: {
    title: "Terms of Use",
    intro:
      "These Terms of Use govern your use of {{appName}}, operated by {{company}}. By using the service you agree to these terms. If you do not agree, please do not use the service.",
    sections: [
      {
        heading: "Who can use the service",
        body: [
          "You must be at least 18 years old to use {{appName}}.",
          "You are responsible for making sure your use of the service is lawful where you live. In Hong Kong, the only lawful way to bet on horse racing is through The Hong Kong Jockey Club.",
        ],
      },
      {
        heading: "What the service is",
        body: [
          "{{appName}} is an educational and informational tool. It lets you practise bets against past race results, review how our model's predictions have performed, and follow odds movements before races.",
          "We do not accept bets, take stakes, pay out winnings or act as a betting operator or agent. Practice bets on {{appName}} have no monetary value.",
        ],
      },
      {
        heading: "No advice and no guarantee",
        body: [
          "Nothing on {{appName}}, including model rankings, suggested picks and statistics, is betting, financial or professional advice. Past performance does not predict future results.",
          "We do not guarantee the accuracy, completeness or timeliness of any information, or that using the service will lead to any winnings. Any decision to bet is yours alone, and you bear any losses.",
        ],
      },
      {
        heading: "Your account",
        body: [
          "If you create an account, you must give accurate information and keep your login details secure. You are responsible for all activity under your account. Tell us promptly at {{email}} if you suspect unauthorised use.",
        ],
      },
      {
        heading: "Subscriptions and payment",
        body: [
          "Some features may require a paid subscription. Prices, billing, renewals, cancellations and refunds are governed by our Sales and Refunds policy, which forms part of these terms.",
        ],
      },
      {
        heading: "Acceptable use",
        body: [
          "You agree not to:",
          "• Copy, scrape, harvest or systematically download content or data from the service, or access it by automated means such as bots or crawlers.",
          "• Resell, sublicense, redistribute or publish the service or its content, including model outputs, without our written permission.",
          "• Reverse-engineer, decompile or attempt to derive our models, source code or methods.",
          "• Interfere with the service's security or operation, or use it for any unlawful purpose.",
        ],
      },
      {
        heading: "Intellectual property",
        body: [
          "The service, its software, design, text and model outputs belong to {{company}} or its licensors and are protected by law. We grant you a limited, personal, non-transferable licence to use the service for your own non-commercial purposes.",
          "Racing information such as racecards, results, odds and horse, jockey and trainer names comes from publicly available information of The Hong Kong Jockey Club and remains its property.",
        ],
      },
      {
        heading: "Third-party information",
        body: [
          "Much of the data shown comes from third parties. It may contain errors, be delayed or change after publication. Always check official sources before relying on it.",
        ],
      },
      {
        heading: "Changes and availability",
        body: [
          "We may add, change or remove features, and the service may occasionally be unavailable for maintenance or reasons outside our control. We do not guarantee uninterrupted access.",
        ],
      },
      {
        heading: "Limitation of liability",
        body: [
          "To the fullest extent permitted by law, the service is provided \"as is\" and {{company}} is not liable for any betting losses or for any indirect, incidental or consequential loss arising from your use of the service. Our total liability to you for any claim is limited to the amount you paid us in the 12 months before the claim arose. Nothing in these terms excludes liability that cannot be excluded by law.",
        ],
      },
      {
        heading: "Indemnity",
        body: [
          "You agree to compensate {{company}} for any claims, losses or costs arising from your breach of these terms or your misuse of the service.",
        ],
      },
      {
        heading: "Suspension and termination",
        body: [
          "We may suspend or close your access if you breach these terms or if we are required to by law. You may stop using the service at any time. Sections that by their nature should survive termination will continue to apply.",
        ],
      },
      {
        heading: "Governing law, changes and contact",
        body: [
          "These terms are governed by the laws of the Hong Kong Special Administrative Region, and the courts of Hong Kong have jurisdiction over any dispute.",
          "We may update these terms from time to time. If you keep using the service after changes take effect, you accept the updated terms. Questions: {{email}}.",
        ],
      },
    ],
  },
  sales: {
    title: "Sales and Refunds",
    intro:
      "This policy explains how paid subscriptions to {{appName}} work, including billing, cancellation and refunds. It forms part of our Terms of Use.",
    sections: [
      {
        heading: "Prices",
        body: [
          "Prices are shown in Hong Kong dollars (HKD). Whether a price includes any applicable taxes will be stated at checkout. The price you pay is the one shown when you confirm your purchase.",
        ],
      },
      {
        heading: "Plans and automatic renewal",
        body: [
          "Subscriptions are billed in advance for each period (for example, monthly or yearly) and renew automatically at the end of each period using your saved payment method, until you cancel.",
          "We will show the renewal date and amount in your account before you are charged.",
        ],
      },
      {
        heading: "Free trials",
        body: [
          "If we offer a free trial, it will convert into a paid subscription at the end of the trial unless you cancel before it ends. We will tell you the trial length and the price that applies before you start.",
        ],
      },
      {
        heading: "Cancelling",
        body: [
          "You can cancel at any time from your account settings or by emailing {{email}}. Cancellation takes effect at the end of your current billing period, and you keep access until then. You will not be charged again after cancelling.",
        ],
      },
      {
        heading: "Refunds",
        body: [
          "• First-time subscribers may request a full refund within 7 days of their first payment.",
          "• Apart from that, payments are non-refundable, and we do not give refunds or credits for partly used periods.",
          "• Duplicate or incorrect charges will always be refunded in full.",
          "Approved refunds are returned to the original payment method, normally within 10 business days. Your bank or card issuer may take longer to show the credit.",
        ],
      },
      {
        heading: "Price changes",
        body: [
          "We may change subscription prices. We will give you at least 30 days' notice before a new price applies to your subscription, so you have time to cancel if you do not wish to continue.",
        ],
      },
      {
        heading: "Failed payments",
        body: [
          "If a renewal payment fails, we may retry it and ask you to update your payment details. If payment still cannot be taken, your paid features may be paused until it is resolved.",
        ],
      },
      {
        heading: "Chargebacks",
        body: [
          "If you think a charge is wrong, please contact us first so we can fix it quickly. If you raise a chargeback with your bank, we may suspend paid features while it is investigated.",
        ],
      },
      {
        heading: "How to contact us",
        body: [
          "For billing questions, cancellations or refund requests, email {{email}} with the email address on your account and the date of the charge.",
        ],
      },
      {
        heading: "Your statutory rights",
        body: ["Nothing in this policy affects any rights you have as a consumer under the laws of Hong Kong."],
      },
    ],
  },
  legalNotices: {
    title: "Legal",
    intro: "Important legal information about {{appName}} and its content.",
    sections: [
      {
        heading: "Copyright",
        body: [
          "The software, design, text and model outputs of {{appName}} are owned by {{company}} or its licensors. All rights reserved. You may not copy, reproduce or redistribute them except as allowed by our Terms of Use.",
        ],
      },
      {
        heading: "Trademarks and non-affiliation",
        body: [
          "{{appName}} is an independent service. It is not affiliated with, endorsed by, sponsored by or connected to The Hong Kong Jockey Club.",
          "\"The Hong Kong Jockey Club\", \"HKJC\" and related names and logos are trademarks of The Hong Kong Jockey Club and are used only to describe the source of racing information.",
        ],
      },
      {
        heading: "Data sources and accuracy",
        body: [
          "Racecards, results, odds, dividends and horse, jockey and trainer names are taken from publicly available information of The Hong Kong Jockey Club, and remain its property. We try to keep this information accurate and up to date but cannot guarantee it. Official HKJC sources prevail over anything shown on {{appName}}.",
        ],
      },
      {
        heading: "No betting services",
        body: [
          "{{appName}} does not accept bets, hold stakes or pay winnings, and is not a betting operator or agent. Practice bets have no monetary value.",
        ],
      },
      {
        heading: "Not advice",
        body: [
          "Model rankings, suggested picks and statistics are for information and education only. They are not betting, financial or professional advice, and past performance does not predict future results.",
        ],
      },
      {
        heading: "Responsible gambling",
        body: [
          "{{appName}} is for adults aged 18 or over only. If you choose to bet, bet only what you can afford to lose.",
          "If gambling is causing you or someone close to you problems, help is available. In Hong Kong, call the Ping Wo Fund problem gambling counselling hotline on 1834 633.",
        ],
      },
      {
        heading: "Links to other websites",
        body: [
          "The service may link to third-party websites. We do not control them and are not responsible for their content or privacy practices.",
        ],
      },
      {
        heading: "Report a problem",
        body: [
          "To report an error, a security issue or content that you believe infringes your intellectual property, email {{email}} with enough detail for us to investigate.",
        ],
      },
      {
        heading: "Company information",
        body: ["{{appName}} is operated by {{company}}, {{address}}. Email: {{email}}."],
      },
    ],
  },
  sitemap: { title: "Site Map", intro: "Every page on {{appName}}.", tools: "Tools", info: "Information" },
} as const;
