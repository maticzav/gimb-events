import mls from 'multilines'
import sendgrid = require('@sendgrid/mail')

/* Credentials */

if (!process.env.SENDGRID_KEY) {
  throw new Error('Missing SENDGRID_KEY')
}

sendgrid.setApiKey(process.env.SENDGRID_KEY!)

/**
 *
 * Sends authentication link to a particular recipient.
 *
 * @param email
 * @param link
 */
export async function sendAuthenticationLink(
  email: string,
  link: string,
): Promise<{ status: 'ok' } | { status: 'err'; message: string }> {
  try {
    const res = await sendgrid.send({
      from: 'Gimb Dogodki <dogodki@gimb.xyz>',
      to: email,
      subject: 'Prijava v Gimb Dogodke',
      text: mls`
        | Za prijavo klikni spodnji link ali pa ga 
        | skopiraj v svoj brskalnik. 
        |
        | ${link}
        `,
      html: mls`
        | Za prijavo klikni spodnji link ali pa ga 
        | skopiraj v svoj brskalnik.
        |
        | <a href="${link}">${link}</a>
        `,
    })

    return { status: 'ok' }
  } catch (err) {
    return {
      status: 'err',
      message: err.message,
    }
  }
}

/**
 *
 * Sends authentication link to a particular recipient.
 *
 * @param email
 * @param link
 */
export async function sendAdminAuthenticationLink(
  email: string,
  link: string,
): Promise<{ status: 'ok' } | { status: 'err'; message: string }> {
  try {
    const res = await sendgrid.send({
      from: 'Gimb Dogodki <events@gimb.org>',
      to: email,
      subject: 'Prijava v Gimb Dogodke',
      text: mls`
        | Za prijavo klikni spodnji link ali pa ga 
        | skopiraj v svoj brskalnik. 
        |
        | ${link}
        |
        | Za prijavo v aplikacijo Gimb Dogodki klini spodnji
        | link, ali pa ga skopiraj v svoj brskalnik.
        |
        | ${link}
        `,
      html: mls`
        | Za prijavo klikni spodnji link ali pa ga 
        | skopiraj v svoj brskalnik.
        |
        | <a href="${link}">${link}</a>
        |
        | Za prijavo v aplikacijo Gimb Dogodki klini spodnji
        | link, ali pa ga skopiraj v svoj brskalnik.
        |
        | ${link}
        `,
    })

    return { status: 'ok' }
  } catch (err) {
    return {
      status: 'err',
      message: err.message,
    }
  }
}
