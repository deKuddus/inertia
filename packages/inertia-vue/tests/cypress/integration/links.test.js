describe('Links', () => {
  it('visits a different page', () => {
    cy.visit('/', {
      onLoad: () => cy.on('window:load', () => { throw 'A location/non-SPA visit was detected' }),
    })

    cy.get('.links-method').click()
    cy.url().should('eq', Cypress.config().baseUrl + '/links/method')

    cy.get('.text').should('have.text', 'This is the links page that demonstrates inertia-link methods')
  })

  describe('Method', () => {
    beforeEach(() => {
      cy.visit('/links/method', {
        onLoad: () => cy.on('window:load', () => { throw 'A location/non-SPA visit was detected' }),
      })
    })

    it('can use the GET method', () => {
      cy.get('.get').click()
      cy.url().should('eq', Cypress.config().baseUrl + '/dump/get')

      cy.window().should('have.property', '_inertia_request_dump')
      cy.window()
        .then(window => window._inertia_request_dump)
        .then(({ method, form, query }) => {
          expect(method).to.eq('get')
          expect(query).to.be.empty
          expect(form).to.be.empty
        })
    })

    it('can use the POST method', () => {
      cy.get('.post').click()
      cy.url().should('eq', Cypress.config().baseUrl + '/dump/post')

      cy.window().should('have.property', '_inertia_request_dump')
      cy.window()
        .then(window => window._inertia_request_dump)
        .then(({ method, form, query }) => {
          expect(method).to.eq('post')
          expect(query).to.be.empty
          expect(form).to.be.empty
        })
    })

    it('can use the PUT method', () => {
      cy.get('.put').click()
      cy.url().should('eq', Cypress.config().baseUrl + '/dump/put')

      cy.window().should('have.property', '_inertia_request_dump')
      cy.window()
        .then(window => window._inertia_request_dump)
        .then(({ method, form, query }) => {
          expect(method).to.eq('put')
          expect(query).to.be.empty
          expect(form).to.be.empty
        })
    })

    it('can use the PATCH method', () => {
      cy.get('.patch').click()
      cy.url().should('eq', Cypress.config().baseUrl + '/dump/patch')

      cy.window().should('have.property', '_inertia_request_dump')
      cy.window()
        .then(window => window._inertia_request_dump)
        .then(({ method, form, query }) => {
          expect(method).to.eq('patch')
          expect(query).to.be.empty
          expect(form).to.be.empty
        })
    })

    it('can use the DELETE method', () => {
      cy.get('.delete').click()
      cy.url().should('eq', Cypress.config().baseUrl + '/dump/delete')

      cy.window().should('have.property', '_inertia_request_dump')
      cy.window()
        .then(window => window._inertia_request_dump)
        .then(({ method, form, query }) => {
          expect(method).to.eq('delete')
          expect(query).to.be.empty
          expect(form).to.be.empty
        })
    })
  })

  describe('Data', () => {
    describe('plain objects', () => {
      beforeEach(() => {
        cy.visit('/links/data/object', {
          onLoad: () => cy.on('window:load', () => { throw 'A location/non-SPA visit was detected' }),
        })
      })

      it('passes data as params using the GET method', () => {
        cy.get('.get').click()
        cy.url().should('eq', Cypress.config().baseUrl + '/dump/get')

        cy.window().should('have.property', '_inertia_request_dump')
        cy.window()
          .then(window => window._inertia_request_dump)
          .then(({ method, headers, form, files, query }) => {
            expect(headers).to.contain.key('content-type')
            expect(headers['content-type']).to.contain('application/json')

            expect(method).to.eq('get')
            expect(query).to.contain.key('foo')
            expect(query.foo).to.eq('get')
            expect(form).to.be.empty
            expect(files).to.be.empty
          })
      })

      it('can pass data using the POST method', () => {
        cy.get('.post').click()
        cy.url().should('eq', Cypress.config().baseUrl + '/dump/post')

        cy.window().should('have.property', '_inertia_request_dump')
        cy.window()
          .then(window => window._inertia_request_dump)
          .then(({ method, headers, form, files, query }) => {
            expect(headers).to.contain.key('content-type')
            expect(headers['content-type']).to.contain('application/json')

            expect(method).to.eq('post')
            expect(query).to.be.empty
            expect(form).to.contain.key('bar')
            expect(form.bar).to.eq('post')
            expect(files).to.be.empty
          })
      })

      it('can pass data using the PUT method', () => {
        cy.get('.put').click()
        cy.url().should('eq', Cypress.config().baseUrl + '/dump/put')

        cy.window().should('have.property', '_inertia_request_dump')
        cy.window()
          .then(window => window._inertia_request_dump)
          .then(({ method, headers, form, files, query }) => {
            expect(headers).to.contain.key('content-type')
            expect(headers['content-type']).to.contain('application/json')

            expect(method).to.eq('put')
            expect(query).to.be.empty
            expect(form).to.contain.key('baz')
            expect(form.baz).to.eq('put')
            expect(files).to.be.empty
          })
      })

      it('can pass data using the PATCH method', () => {
        cy.get('.patch').click()
        cy.url().should('eq', Cypress.config().baseUrl + '/dump/patch')

        cy.window().should('have.property', '_inertia_request_dump')
        cy.window()
          .then(window => window._inertia_request_dump)
          .then(({ method, headers, form, files, query }) => {
            expect(headers).to.contain.key('content-type')
            expect(headers['content-type']).to.contain('application/json')

            expect(method).to.eq('patch')
            expect(query).to.be.empty
            expect(form).to.contain.key('foo')
            expect(form.foo).to.eq('patch')
            expect(files).to.be.empty
          })
      })

      it('can pass data using the DELETE method', () => {
        cy.get('.delete').click()
        cy.url().should('eq', Cypress.config().baseUrl + '/dump/delete')

        cy.window().should('have.property', '_inertia_request_dump')
        cy.window()
          .then(window => window._inertia_request_dump)
          .then(({ method, headers, form, files, query }) => {
            expect(headers).to.contain.key('content-type')
            expect(headers['content-type']).to.contain('application/json')

            expect(method).to.eq('delete')
            expect(query).to.be.empty
            expect(form).to.contain.key('bar')
            expect(form.bar).to.eq('delete')
            expect(files).to.be.empty
          })
      })
    })

    describe.skip('FormData objects', () => {
      beforeEach(() => {
        cy.visit('/links/data/form-data', {
          onLoad: () => cy.on('window:load', () => { throw 'A location/non-SPA visit was detected' }),
        })
      })

      it('can pass data using the POST method', () => {
        cy.get('.post').click()
        cy.url().should('eq', Cypress.config().baseUrl + '/dump/post')

        cy.window().should('have.property', '_inertia_request_dump')
        cy.window()
          .then(window => window._inertia_request_dump)
          .then(({ method, headers, form, files, query }) => {
            expect(headers).to.contain.key('content-type')
            expect(headers['content-type']).to.contain('multipart/form-data; boundary=')

            expect(method).to.eq('post')
            expect(query).to.be.empty
            expect(form).to.contain.key('bar')
            expect(form.bar).to.eq('baz')
            expect(files).to.be.empty
          })
      })

      it('can pass data using the PUT method', () => {
        cy.get('.put').click()
        cy.url().should('eq', Cypress.config().baseUrl + '/dump/put')

        cy.window().should('have.property', '_inertia_request_dump')
        cy.window()
          .then(window => window._inertia_request_dump)
          .then(({ method, headers, form, files, query }) => {
            expect(headers).to.contain.key('content-type')
            expect(headers['content-type']).to.contain('multipart/form-data; boundary=')

            expect(method).to.eq('put')
            expect(query).to.be.empty
            expect(form).to.contain.key('bar')
            expect(form.bar).to.eq('baz')
            expect(files).to.be.empty
          })
      })

      it('can pass data using the PATCH method', () => {
        cy.get('.patch').click()
        cy.url().should('eq', Cypress.config().baseUrl + '/dump/patch')

        cy.window().should('have.property', '_inertia_request_dump')
        cy.window()
          .then(window => window._inertia_request_dump)
          .then(({ method, headers, form, files, query }) => {
            expect(headers).to.contain.key('content-type')
            expect(headers['content-type']).to.contain('multipart/form-data; boundary=')

            expect(method).to.eq('patch')
            expect(query).to.be.empty
            expect(form).to.contain.key('bar')
            expect(form.bar).to.eq('baz')
            expect(files).to.be.empty
          })
      })

      it('can pass data using the DELETE method', () => {
        cy.get('.delete').click()
        cy.url().should('eq', Cypress.config().baseUrl + '/dump/delete')

        cy.window().should('have.property', '_inertia_request_dump')
        cy.window()
          .then(window => window._inertia_request_dump)
          .then(({ method, headers, form, files, query }) => {
            expect(headers).to.contain.key('content-type')
            expect(headers['content-type']).to.contain('multipart/form-data; boundary=')

            expect(method).to.eq('delete')
            expect(query).to.be.empty
            expect(form).to.contain.key('bar')
            expect(form.bar).to.eq('baz')
            expect(files).to.be.empty
          })
      })
    })

    describe('auto-converted objects (when files are present)', () => {
      beforeEach(() => {
        cy.visit('/links/data/auto-converted', {
          onLoad: () => cy.on('window:load', () => { throw 'A location/non-SPA visit was detected' }),
        })
      })

      it('auto-converts objects to form-data when files are present using the POST method', () => {
        cy.get('.post').click()
        cy.url().should('eq', Cypress.config().baseUrl + '/dump/post')

        cy.window().should('have.property', '_inertia_request_dump')
        cy.window()
          .then(window => window._inertia_request_dump)
          .then(({ method, headers, form, files, query }) => {
            expect(headers).to.contain.key('content-type')
            expect(headers['content-type']).to.contain('multipart/form-data; boundary=')

            expect(method).to.eq('post')
            expect(query).to.be.empty
            expect(form).to.contain.key('foo')
            expect(form.foo).to.eq('bar')
            expect(files).to.not.be.empty
          })
      })

      it('auto-converts objects to form-data when files are present using the PUT method', () => {
        cy.get('.put').click()
        cy.url().should('eq', Cypress.config().baseUrl + '/dump/put')

        cy.window().should('have.property', '_inertia_request_dump')
        cy.window()
          .then(window => window._inertia_request_dump)
          .then(({ method, headers, form, files, query }) => {
            expect(headers).to.contain.key('content-type')
            expect(headers['content-type']).to.contain('multipart/form-data; boundary=')

            expect(method).to.eq('put')
            expect(query).to.be.empty
            expect(form).to.contain.key('foo')
            expect(form.foo).to.eq('bar')
            expect(files).to.not.be.empty
          })
      })

      it('auto-converts objects to form-data when files are present using the PATCH method', () => {
        cy.get('.patch').click()
        cy.url().should('eq', Cypress.config().baseUrl + '/dump/patch')

        cy.window().should('have.property', '_inertia_request_dump')
        cy.window()
          .then(window => window._inertia_request_dump)
          .then(({ method, headers, form, files, query }) => {
            expect(headers).to.contain.key('content-type')
            expect(headers['content-type']).to.contain('multipart/form-data; boundary=')

            expect(method).to.eq('patch')
            expect(query).to.be.empty
            expect(form).to.contain.key('foo')
            expect(form.foo).to.eq('bar')
            expect(files).to.not.be.empty
          })
      })

      it('auto-converts objects to form-data when files are present using the DELETE method', () => {
        cy.get('.delete').click()
        cy.url().should('eq', Cypress.config().baseUrl + '/dump/delete')

        cy.window().should('have.property', '_inertia_request_dump')
        cy.window()
          .then(window => window._inertia_request_dump)
          .then(({ method, headers, form, files, query }) => {
            expect(headers).to.contain.key('content-type')
            expect(headers['content-type']).to.contain('multipart/form-data; boundary=')

            expect(method).to.eq('delete')
            expect(query).to.be.empty
            expect(form).to.contain.key('foo')
            expect(form.foo).to.eq('bar')
            expect(files).to.not.be.empty
          })
      })
    })
  })

  describe('Headers', () => {
    beforeEach(() => {
      cy.visit('/links/headers', {
        onLoad: () => cy.on('window:load', () => { throw 'A location/non-SPA visit was detected' }),
      })
    })

    it('has the default set of headers', () => {
      cy.get('.default').click()
      cy.url().should('eq', Cypress.config().baseUrl + '/dump/get')

      cy.window().should('have.property', '_inertia_request_dump')
      cy.window()
        .then(window => window._inertia_request_dump)
        .then(({ headers }) => {
          expect(headers).to.contain.keys(['accept', 'x-requested-with', 'x-inertia'])
          expect(headers['accept']).to.eq('text/html, application/xhtml+xml')
          expect(headers['x-requested-with']).to.eq('XMLHttpRequest')
          expect(headers['x-inertia']).to.eq('true')
        })
    })

    it('allows to settings custom headers using the GET method', () => {
      cy.get('.custom').click()
      cy.url().should('eq', Cypress.config().baseUrl + '/dump/get')

      cy.window().should('have.property', '_inertia_request_dump')
      cy.window()
        .then(window => window._inertia_request_dump)
        .then(({ headers }) => {
          expect(headers).to.contain.keys(['accept', 'x-requested-with', 'x-inertia', 'foo'])
          expect(headers['accept']).to.eq('text/html, application/xhtml+xml')
          expect(headers['x-requested-with']).to.eq('XMLHttpRequest')
          expect(headers['x-inertia']).to.eq('true')
          expect(headers['foo']).to.eq('bar')
        })
    })

    it('cannot override built-in Inertia headers', () => {
      cy.get('.overridden').click()
      cy.url().should('eq', Cypress.config().baseUrl + '/dump/post')

      cy.window().should('have.property', '_inertia_request_dump')
      cy.window()
        .then(window => window._inertia_request_dump)
        .then(({ headers }) => {
          expect(headers).to.contain.keys(['accept', 'x-requested-with', 'x-inertia', 'bar'])
          expect(headers['accept']).to.eq('text/html, application/xhtml+xml')
          expect(headers['x-requested-with']).to.eq('XMLHttpRequest')
          expect(headers['x-inertia']).to.eq('true')
          expect(headers['bar']).to.eq('baz')
        })
    })
  })

  describe('Replace', () => {
    beforeEach(() => {
      cy.visit('/', {
        onLoad: () => cy.on('window:load', () => { throw 'A location/non-SPA visit was detected' }),
      })
    })

    it('replaces the current history state', () => {
      cy.get('.links-replace').click()
      cy.url().should('eq', Cypress.config().baseUrl + '/links/replace')

      cy.get('.replace').click()
      cy.url().should('eq', Cypress.config().baseUrl + '/dump/get')

      cy.go(-1)
      cy.url().should('eq', Cypress.config().baseUrl + '/')

      cy.go(1)
      cy.url().should('eq', Cypress.config().baseUrl + '/dump/get')
    })

    it('does not replace the current history state when it is set to false', () => {
      cy.get('.links-replace').click()
      cy.url().should('eq', Cypress.config().baseUrl + '/links/replace')

      cy.get('.replace-false').click()
      cy.url().should('eq', Cypress.config().baseUrl + '/dump/get')

      cy.go(-1)
      cy.url().should('eq', Cypress.config().baseUrl + '/links/replace')

      cy.go(1)
      cy.url().should('eq', Cypress.config().baseUrl + '/dump/get')
    })
  })

  describe('Preserve state', () => {
    beforeEach(() => {
      cy.visit('/links/preserve-state', {
        onLoad: () => cy.on('window:load', () => { throw 'A location/non-SPA visit was detected' }),
      })
    })

    it('preserves the page\'s local state', () => {
      cy.get('.foo').should('have.text', 'Foo is now default')
      cy.get('.field').type('Example value')

      cy.window().should('have.property', '_inertia_page_key')
      cy.window().then(window => {
        const componentKey = window._inertia_page_key

        cy.get('.preserve').click()
        cy.url().should('eq', Cypress.config().baseUrl + '/links/preserve-state-page-two')

        cy.window().then(window => {
          expect(componentKey).to.eq(window._inertia_page_key)
          cy.get('.foo').should('have.text', 'Foo is now bar')
          cy.get('.field').should('have.value', 'Example value')
        })
      })
    })

    it('does not preserve the page\'s local state', () => {
      cy.get('.foo').should('have.text', 'Foo is now default')
      cy.get('.field').type('Another value')

      cy.window().should('have.property', '_inertia_page_key')
      cy.window().then(window => {
        const componentKey = window._inertia_page_key

        cy.get('.preserve-false').click()
        cy.url().should('eq', Cypress.config().baseUrl + '/links/preserve-state-page-two')

        cy.window().then(window => {
          expect(componentKey).to.not.eq(window._inertia_page_key)
          cy.get('.foo').should('have.text', 'Foo is now baz')
          cy.get('.field').should('have.value', '')
        })
      })
    })
  })

  describe('Preserve scroll', () => {
    beforeEach(() => {
      cy.visit('/links/preserve-scroll')
      cy.get('.foo').should('have.text', 'Foo is now default')
      cy.get('.document-position').should('have.text', 'Document scroll position is 0 & 0')
      cy.get('.area1-position').should('have.text', 'Area 1 scroll position is 0 & 0')
      cy.get('.area2-position').should('have.text', 'Area 2 scroll position is 0 & 0')

      cy.scrollTo('20px', '40px')
      cy.get('#area1').scrollTo('195px', '198px')
      cy.get('#area2').scrollTo('201px', '205px')

      cy.get('.document-position').should('have.text', 'Document scroll position is 20 & 40')
      cy.get('.area1-position').should('have.text', 'Area 1 scroll position is 195 & 198')
      cy.get('.area2-position').should('have.text', 'Area 2 scroll position is 201 & 205')
    })

    it('resets all tracked scroll regions when preserve-scroll is not set ', () => {
      cy.get('.default').click()
      cy.url().should('eq', Cypress.config().baseUrl + '/links/preserve-scroll-page-two')

      cy.get('.foo').should('have.text', 'Foo is now bar')
      cy.get('.document-position').should('have.text', 'Document scroll position is 0 & 0')
      cy.get('.area1-position').should('have.text', 'Area 1 scroll position is 0 & 0')
      cy.get('.area2-position').should('have.text', 'Area 2 scroll position is 0 & 0')
    })

    it('restores all tracked scroll regions when pressing the back button', () => {
      cy.get('.default').click()
      cy.url().should('eq', Cypress.config().baseUrl + '/links/preserve-scroll-page-two')
      cy.get('.foo').should('have.text', 'Foo is now bar')

      cy.go(-1)
      cy.url().should('eq', Cypress.config().baseUrl + '/links/preserve-scroll')
      cy.get('.foo').should('have.text', 'Foo is now default')

      cy.get('.document-position').should('not.have.text', 'Document scroll position is 0 & 0')
      cy.get('.area1-position').should('have.text', 'Area 1 scroll position is 0 & 0')
      cy.get('.area2-position').should('have.text', 'Area 2 scroll position is 201 & 205')
    })

    it('restores all tracked scroll regions when pressing the back button from another website', () => {
      cy.get('.off-site').click()
      cy.url().should('eq', Cypress.config().baseUrl + '/non-inertia')

      cy.go(-1)
      cy.url().should('eq', Cypress.config().baseUrl + '/links/preserve-scroll')

      cy.get('.document-position').should('not.have.text', 'Document scroll position is 0 & 0')
      cy.get('.foo').should('have.text', 'Foo is now default')
    })

    describe('visiting links using preserve-scroll', () => {
      it.skip('preserves all tracked scroll regions', () => {
        cy.get('.preserve').click()
        cy.url().should('eq', Cypress.config().baseUrl + '/links/preserve-scroll-page-two')

        cy.get('.document-position').should('not.have.text', 'Document scroll position is 0 & 0')
        cy.get('.foo').should('have.text', 'Foo is now baz')
        cy.get('.area1-position').should('have.text', 'Area 1 scroll position is 0 & 0')
        cy.get('.area2-position').should('have.text', 'Area 2 scroll position is 201 & 205')
      })

      it('restores all tracked scroll regions when pressing the back button', () => {
        cy.get('.preserve').click()
        cy.url().should('eq', Cypress.config().baseUrl + '/links/preserve-scroll-page-two')

        cy.go(-1)
        cy.url().should('eq', Cypress.config().baseUrl + '/links/preserve-scroll')

        cy.get('.document-position').should('not.have.text', 'Document scroll position is 0 & 0')
        cy.get('.foo').should('have.text', 'Foo is now default')
        cy.get('.area1-position').should('have.text', 'Area 1 scroll position is 0 & 0')
        cy.get('.area2-position').should('have.text', 'Area 2 scroll position is 201 & 205')
      })
    })
  })

  describe('URL fragment navigation (& automatic scrolling)', () => {
    /** @see https://github.com/inertiajs/inertia/pull/257 */

    beforeEach(() => {
      cy.visit('/links/url-fragments', {
        onLoad: () => cy.on('window:load', () => { throw 'A location/non-SPA visit was detected' }),
      })
      cy.url().should('eq', Cypress.config().baseUrl + '/links/url-fragments')
      cy.get('.document-position').should('have.text', 'Document scroll position is 0 & 0')
    })

    it('Scrolls to the fragment element when making a visit to a different page', () => {
      cy.get('.basic').click()
      cy.url().should('eq', Cypress.config().baseUrl + '/links/url-fragments#target')
      cy.get('.document-position').should('not.have.text', 'Document scroll position is 0 & 0')
    })

    it('Scrolls to the fragment element when making a visit to the same page', () => {
      cy.get('.fragment').click()
      cy.url().should('eq', Cypress.config().baseUrl + '/links/url-fragments#target')
      cy.get('.document-position').should('not.have.text', 'Document scroll position is 0 & 0')
    })

    it('Does not scroll to the fragment element when it does not exist on the page', () => {
      cy.get('.non-existent-fragment').click()
      cy.url().should('eq', Cypress.config().baseUrl + '/links/url-fragments#non-existent-fragment')
      cy.get('.document-position').should('have.text', 'Document scroll position is 0 & 0')
    })
  })

  describe('Partial Reloads', () => {
    beforeEach(() => {
      cy.visit('/links/partial-reloads', {
        onLoad: () => cy.on('window:load', () => { throw 'A location/non-SPA visit was detected' }),
      })
      cy.url().should('eq', Cypress.config().baseUrl + '/links/partial-reloads')
      cy.get('.foo-text').should('have.text', 'Foo is now 1')
      cy.get('.bar-text').should('have.text', 'Bar is now 2')
      cy.get('.baz-text').should('have.text', 'Baz is now 3')
    })

    it('does not have headers specific to partial reloads when the feature is not being used', () => {
      cy.get('.all').click()
      cy.url().should('eq', Cypress.config().baseUrl + '/links/partial-reloads')

      cy.window().should('have.property', '_inertia_props')
      cy.window()
        .then(window => window._inertia_props)
        .then(({ headers }) => {
          expect(headers).to.not.contain.keys(['x-inertia-partial-component', 'x-inertia-partial-data'])
        })
    })

    it('has headers specific to partial reloads', () => {
      cy.get('.foo-bar').click()
      cy.url().should('eq', Cypress.config().baseUrl + '/links/partial-reloads')

      cy.window().should('have.property', '_inertia_props')
      cy.window()
        .then(window => window._inertia_props)
        .then(({ headers }) => {
          expect(headers).to.contain.keys(['accept', 'x-requested-with', 'x-inertia', 'x-inertia-partial-component', 'x-inertia-partial-data'])
          expect(headers['accept']).to.eq('text/html, application/xhtml+xml')
          expect(headers['x-requested-with']).to.eq('XMLHttpRequest')
          expect(headers['x-inertia']).to.eq('true')
          expect(headers['x-inertia-partial-data']).to.eq('headers,foo,bar')
          expect(headers['x-inertia-partial-component']).to.eq('Links/PartialReloads')
        })
    })

    it('it updates all props when the feature is not being used', () => {
      cy.get('.all').click()
      cy.url().should('eq', Cypress.config().baseUrl + '/links/partial-reloads')

      cy.get('.foo-text').should('have.text', 'Foo is now 2')
      cy.get('.bar-text').should('have.text', 'Bar is now 3')
      cy.get('.baz-text').should('have.text', 'Baz is now 4')
    })

    it('it only updates props that are passed through "only"', () => {
      cy.get('.foo-bar').click()
      cy.url().should('eq', Cypress.config().baseUrl + '/links/partial-reloads')
      cy.get('.foo-text').should('have.text', 'Foo is now 2')
      cy.get('.bar-text').should('have.text', 'Bar is now 3')
      cy.get('.baz-text').should('have.text', 'Baz is now 3')

      cy.get('.baz').click()
      cy.url().should('eq', Cypress.config().baseUrl + '/links/partial-reloads')
      cy.get('.foo-text').should('have.text', 'Foo is now 2')
      cy.get('.bar-text').should('have.text', 'Bar is now 3')
      cy.get('.baz-text').should('have.text', 'Baz is now 5')

      cy.get('.all').click()
      cy.url().should('eq', Cypress.config().baseUrl + '/links/partial-reloads')
      cy.get('.foo-text').should('have.text', 'Foo is now 3')
      cy.get('.bar-text').should('have.text', 'Bar is now 4')
      cy.get('.baz-text').should('have.text', 'Baz is now 5')
    })
  })

  describe('"as" warning', () => {
    it('shows no warning when using GET inertia-links', () => {
      cy.visit('/links/as-warning/get', {
        onBeforeLoad(window) {
          cy.spy(window.console, 'warn').as('consoleWarn')
        },
      })

      cy.get('@consoleWarn').should('not.be.called')
    })

    it('shows a warning when using POST inertia-links using the anchor tag', () => {
      cy.visit('/links/as-warning/post', {
        onBeforeLoad(window) {
          cy.spy(window.console, 'warn').as('consoleWarn')
        },
      })

      cy
        .get('@consoleWarn')
        .should('be.calledWith',
          'Creating POST/PUT/PATCH/DELETE <a> links is discouraged as it causes "Open Link in New Tab/Window" accessibility issues.\n\n' +
          'Please specify a more appropriate element using the "as" attribute. For example:\n\n' +
          '<inertia-link href="http://localhost:13714/example" method="post" as="button">...</inertia-link>',
        )
    })

    it('shows a warning when using PUT inertia-links using the anchor tag', () => {
      cy.visit('/links/as-warning/put', {
        onBeforeLoad(window) {
          cy.spy(window.console, 'warn').as('consoleWarn')
        },
      })

      cy
        .get('@consoleWarn')
        .should('be.calledWith',
          'Creating POST/PUT/PATCH/DELETE <a> links is discouraged as it causes "Open Link in New Tab/Window" accessibility issues.\n\n' +
          'Please specify a more appropriate element using the "as" attribute. For example:\n\n' +
          '<inertia-link href="http://localhost:13714/example" method="put" as="button">...</inertia-link>',
        )
    })

    it('shows a warning when using PUT inertia-links using the anchor tag', () => {
      cy.visit('/links/as-warning/patch', {
        onBeforeLoad(window) {
          cy.spy(window.console, 'warn').as('consoleWarn')
        },
      })

      cy
        .get('@consoleWarn')
        .should('be.calledWith',
          'Creating POST/PUT/PATCH/DELETE <a> links is discouraged as it causes "Open Link in New Tab/Window" accessibility issues.\n\n' +
          'Please specify a more appropriate element using the "as" attribute. For example:\n\n' +
          '<inertia-link href="http://localhost:13714/example" method="patch" as="button">...</inertia-link>',
        )
    })

    it('shows a warning when using PUT inertia-links using the anchor tag', () => {
      cy.visit('/links/as-warning/delete', {
        onBeforeLoad(window) {
          cy.spy(window.console, 'warn').as('consoleWarn')
        },
      })

      cy
        .get('@consoleWarn')
        .should('be.calledWith',
          'Creating POST/PUT/PATCH/DELETE <a> links is discouraged as it causes "Open Link in New Tab/Window" accessibility issues.\n\n' +
          'Please specify a more appropriate element using the "as" attribute. For example:\n\n' +
          '<inertia-link href="http://localhost:13714/example" method="delete" as="button">...</inertia-link>',
        )
    })
  })
})
