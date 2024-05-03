import animVueJS from '../fixtures/vue-js.json'
import { Blottie } from './../../src'

describe('<Blottie />', () => {
  const types = {
    html: 'div',
    canvas: 'canvas',
    svg: 'svg',
  }

  for (const key in types) {
    if (Object.prototype.hasOwnProperty.call(types, key)) {
      const tag = types[key as keyof typeof types]

      it(`renderer ${key}`, () => {
        cy.mount(Blottie, {
          attrs: {
            class: 'animation',
          },
          props: {
            lottie: {
              autoplay: true,
              loop: true,
              animationData: animVueJS,
              renderer: key,
            },
          },
        })

        cy.get(`.animation > ${tag}`)
      })
    }
  }

  it('slot', () => {
    cy.mount(Blottie, {
      attrs: {
        class: 'animation',
      },
      props: {
        lottie: {
          autoplay: true,
          loop: true,
          path: 'https://assets5.lottiefiles.com/packages/lf20_z49WoSvxKM.json',
          renderer: 'svg',
        },
        beforeInit: async () => {
          await new Promise<void>((resolve) => {
            setTimeout(() => {
              resolve()
            }, 1000)
          })
        },
      },
      slots: {
        loading: 'Loading...',
      },
    })

    cy.get('.animation').should('have.text', 'Loading...')
  })

  it('events', () => {
    const onReadySpy = cy.spy().as('onReadySpy')
    // const onEnterFrameSpy = cy.spy().as('onEnterFrameSpy')
    // const onLoopCompleteSpy = cy.spy().as('onLoopCompleteSpy')
    const onDrawnFrameSpy = cy.spy().as('onDrawnFrameSpy')

    cy.mount(Blottie, {
      props: {
        lottie: {
          autoplay: true,
          loop: true,
          animationData: animVueJS,
          renderer: 'svg',
        },
        onReady: onReadySpy,
        // onEnterFrame: onEnterFrameSpy,
        onDrawnFrame: onDrawnFrameSpy,
        // onLoopComplete: onLoopCompleteSpy,
      },
    })

    cy.get('@onReadySpy').should('have.been.calledOnce')
    // cy.get('@onEnterFrameSpy').should('have.been.called')
    cy.get('@onDrawnFrameSpy').should('have.been.called')
    // cy.get('@onLoopCompleteSpy').should('have.been.called')
  })
})
