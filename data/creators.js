/* ================================================================
   FORBIDDEN GNOSIS — CREATOR DATA
   Single source of truth for all creator profiles.
   To add a creator: add one key to this object.
   ================================================================ */

window.FG_CREATORS = {

  'house-of-terravian': {
    slug:          'house-of-terravian',
    displayName:   'House of Terravian',
    shortBio:      'Founder of the Noo World OS. Archivist, builder, sovereign.',
    longBio:       'House of Terravian is the founding archivist of Forbidden Gnosis and the architect of the Noo World OS — a network of interconnected platforms built at the intersection of culture, consciousness, and digital sovereignty. Every artifact published here is a record of thinking that refused to stay hidden.',
    avatarInitials: 'HT',
    avatarUrl:     null,
    founding:      true,
    joinedEpoch:   1742000000000,
    artifacts: [
      {
        id:          'first-forbidden-artifact',
        title:       'The First Forbidden Artifact',
        tag:         'Proof-of-Concept · Vol. I',
        description: 'A founding document introducing the philosophy of AI-generated knowledge and the monetization logic of Forbidden Gnosis. 12 pages. The first entry in the archive. Archived on the Wayback Machine.',
        price:       '$1',
        purchaseUrl: 'https://payhip.com/forbiddengnosis',
        free:        false,
        published:   true
      }
    ],
    collections: [],
    readingPath: [
      {
        step:       1,
        title:      'Begin Here — The First Forbidden Artifact',
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
