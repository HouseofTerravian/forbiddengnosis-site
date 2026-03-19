/* ================================================================
   FORBIDDEN GNOSIS — CREATOR DATA
   Single source of truth for all creator profiles.
   To add a creator: add one key to this object.
   ================================================================ */

/* ── CATEGORY REGISTRY ── */
window.FG_CATEGORIES = [
  { id: 'philosophy',        label: 'Philosophy' },
  { id: 'ai-technology',     label: 'AI & Technology' },
  { id: 'consciousness',     label: 'Consciousness' },
  { id: 'governance',        label: 'Governance' },
  { id: 'spirituality',      label: 'Spirituality' },
  { id: 'prompt-engineering', label: 'Prompt Engineering' },
  { id: 'history',           label: 'History' },
  { id: 'craft',             label: 'Craft & Methodology' },
  { id: 'civilization',      label: 'Civilization' },
  { id: 'science',           label: 'Science' },
  { id: 'strategy',          label: 'Strategy' }
];

window.FG_CREATORS = {

  'house-of-terravian': {
    slug:          'house-of-terravian',
    displayName:   'House of Terravian',
    shortBio:      'Founder of the Noo World OS. Archivist, builder, sovereign.',
    longBio:       'House of Terravian is the founding archivist of Forbidden Gnosis and the architect of the Noo World OS \u2014 a network of interconnected platforms built at the intersection of culture, consciousness, and digital sovereignty. Every artifact published here is a record of thinking that refused to stay hidden.',
    avatarInitials: 'HT',
    avatarUrl:     null,
    founding:      true,
    joinedEpoch:   1742000000000,
    artifacts: [
      {
        id:          'first-forbidden-artifact',
        title:       'The First Forbidden Artifact',
        tag:         'Proof-of-Concept \u00b7 Vol. I',
        description: 'A founding document introducing the philosophy of AI-generated knowledge and the monetization logic of Forbidden Gnosis. 12 pages. The first entry in the archive. Archived on the Wayback Machine.',
        price:       '$1',
        purchaseUrl: 'https://payhip.com/forbiddengnosis',
        free:        false,
        published:   true,
        category:    'philosophy',
        tags:        ['ai-knowledge', 'manifesto', 'founding', 'monetization', 'archive-philosophy']
      },
      {
        id:          'ai-civilization-collapse',
        title:       'AI Civilization Collapse Scenarios',
        tag:         'Civilization \u00b7 Theory',
        description: 'A structured analysis of civilizational risk patterns derived from AI modeling and historical synthesis.',
        price:       '$5',
        purchaseUrl: null,
        free:        false,
        published:   false,
        category:    'civilization',
        tags:        ['collapse', 'risk-analysis', 'ai-modeling', 'historical-synthesis']
      },
      {
        id:          'consciousness-problem',
        title:       'The Consciousness Problem: A Framework for the AI Age',
        tag:         'Philosophy \u00b7 Consciousness',
        description: 'An inquiry into the nature of machine consciousness and its implications for human identity and rights.',
        price:       '$10',
        purchaseUrl: null,
        free:        false,
        published:   false,
        category:    'consciousness',
        tags:        ['machine-consciousness', 'identity', 'rights', 'philosophy-of-mind']
      },
      {
        id:          'sacred-prompt-engineering',
        title:       'Sacred Prompt Engineering',
        tag:         'Craft \u00b7 Methodology',
        description: 'The hidden science of human\u2013AI discourse. How intent, framing, and inquiry structure shape the quality of AI-generated insight.',
        price:       '$8',
        purchaseUrl: null,
        free:        false,
        published:   false,
        category:    'prompt-engineering',
        tags:        ['prompt-craft', 'ai-discourse', 'methodology', 'intent-framing']
      },
      {
        id:          'hidden-patterns-history',
        title:       'Hidden Patterns: What AI Found in Human History',
        tag:         'History \u00b7 Research',
        description: 'An AI-generated synthesis of recurring civilizational patterns that mainstream historiography has not fully assembled.',
        price:       '$12',
        purchaseUrl: null,
        free:        false,
        published:   false,
        category:    'history',
        tags:        ['civilizational-patterns', 'historiography', 'ai-synthesis', 'research']
      },
      {
        id:          'governance-post-ai',
        title:       'Governance Models for a Post-AI World',
        tag:         'Governance \u00b7 Futures',
        description: 'Speculative frameworks for political, social, and institutional design in a world shaped by artificial general intelligence.',
        price:       '$15',
        purchaseUrl: null,
        free:        false,
        published:   false,
        category:    'governance',
        tags:        ['post-agi', 'institutional-design', 'speculative-governance', 'futures']
      }
    ],
    collections: [
      {
        id:          'founding-trilogy',
        name:        'The Founding Trilogy',
        description: 'The three documents that established the philosophical foundation of Forbidden Gnosis.',
        artifactIds: ['first-forbidden-artifact', 'consciousness-problem', 'sacred-prompt-engineering']
      }
    ],
    readingPath: [
      {
        step:       1,
        title:      'Begin Here \u2014 The First Forbidden Artifact',
        artifactId: 'first-forbidden-artifact',
        note:       'The founding document. The philosophy of the archive, from the first session.'
      }
    ],
    socialLinks: {
      youtube:    null,
      x:          null,
      newsletter: null
    }
  }

};
