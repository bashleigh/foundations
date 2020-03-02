import { PagedResultContactModel_ } from '../../../types'

export const contacts: PagedResultContactModel_ = {
  pageNumber: 1,
  pageSize: 10,
  pageCount: 10,
  totalCount: 3966,
  _links: {
    self: {
      href: '/contacts/?PageNumber=1&PageSize=10',
    },
    first: {
      href: '/contacts/?PageNumber=1&PageSize=10',
    },
    next: {
      href: '/contacts/?PageNumber=2&PageSize=10',
    },
    last: {
      href: '/contacts/?PageNumber=397&PageSize=10',
    },
  },
  _embedded: [
    {
      id: "RPT20000017",
      title: 'Mr',
      forename: 'John',
      surname: 'Smith',
      dateOfBirth: '1992-08-12',
      active: true,
      marketingConsent: 'grant',
      source: {
        id: 'SOL',
        type: 'office'
      },
      homePhone: '01234 567890',
      workPhone: null,
      mobilePhone: '07890 123456',
      email: 'example@email.com',
      officeIds: [
        'OXF'
      ],
      negotiatorIds: [
        'JAS'
      ],
      primaryAddress: {
        type: 'primary',
        buildingName: '',
        buildingNumber: '15',
        line1: 'Example street',
        line2: 'Solihull',
        line3: 'West Midlands',
        line4: '',
        postcode: 'B91 2XX',
        countryId: 'GB'
      },
      secondaryAddress: null,
      workAddress: {
        type: 'work',
        buildingName: '',
        buildingNumber: '44',
        line1: 'Test street',
        line2: 'Shirley',
        line3: 'West Midlands',
        line4: '',
        postcode: 'B90 1ZZ',
        countryId: 'GB'
      },
      metadata: {
        CustomField1: 'CustomValue1',
        CustomField2: 'CustomValue2'
      },
      _eTag: "\"E9510E0E57BEECE1F14A0550DDA8116D\"",
      _links: {
        self: {
          href: '/contacts/MKC16000098',
        },
        idChecks: {
          href: '/contacts/MKC16000098/identityChecks',
        },
      },
      _embedded: null,
    },
    {
      id: "RPT20000018",
      title: 'Mr',
      forename: 'John',
      surname: 'Smith b',
      dateOfBirth: '1992-08-12',
      active: true,
      marketingConsent: 'grant',
      source: {
        id: 'SOL',
        type: 'office'
      },
      homePhone: '01234 567890',
      workPhone: null,
      mobilePhone: '07890 123456',
      email: 'example@email.com',
      officeIds: [
        'OXF'
      ],
      negotiatorIds: [
        'JAS'
      ],
      primaryAddress: {
        type: 'primary',
        buildingName: '',
        buildingNumber: '15',
        line1: 'Example street',
        line2: 'Solihull',
        line3: 'West Midlands',
        line4: '',
        postcode: 'B91 2XX',
        countryId: 'GB'
      },
      secondaryAddress: null,
      workAddress: {
        type: 'work',
        buildingName: '',
        buildingNumber: '44',
        line1: 'Test street',
        line2: 'Shirley',
        line3: 'West Midlands',
        line4: '',
        postcode: 'B90 1ZZ',
        countryId: 'GB'
      },
      metadata: {
        CustomField1: 'CustomValue1',
        CustomField2: 'CustomValue2'
      },
      _eTag: "\"E9510E0E57BEECE1F14A0550DDA8116D\"",
      _links: {
        self: {
          href: '/contacts/MKC16000098',
        },
        idChecks: {
          href: '/contacts/MKC16000098/identityChecks',
        },
      },
      _embedded: null,
    },
    {
      id: "RPT20000019",
      title: 'Mr',
      forename: 'John',
      surname: 'Smith c',
      dateOfBirth: '1992-08-12',
      active: true,
      marketingConsent: 'grant',
      source: {
        id: 'SOL',
        type: 'office'
      },
      homePhone: '01234 567890',
      workPhone: null,
      mobilePhone: '07890 123456',
      email: 'example@email.com',
      officeIds: [
        'OXF'
      ],
      negotiatorIds: [
        'JAS'
      ],
      primaryAddress: {
        type: 'primary',
        buildingName: '',
        buildingNumber: '15',
        line1: 'Example street',
        line2: 'Solihull',
        line3: 'West Midlands',
        line4: '',
        postcode: 'B91 2XX',
        countryId: 'GB'
      },
      secondaryAddress: null,
      workAddress: {
        type: 'work',
        buildingName: '',
        buildingNumber: '44',
        line1: 'Test street',
        line2: 'Shirley',
        line3: 'West Midlands',
        line4: '',
        postcode: 'B90 1ZZ',
        countryId: 'GB'
      },
      metadata: {
        CustomField1: 'CustomValue1',
        CustomField2: 'CustomValue2'
      },
      _eTag: "\"E9510E0E57BEECE1F14A0550DDA8116D\"",
      _links: {
        self: {
          href: '/contacts/MKC16000098',
        },
        idChecks: {
          href: '/contacts/MKC16000098/identityChecks',
        },
      },
      _embedded: null,
    }
  ],
}
