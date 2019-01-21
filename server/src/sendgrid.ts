import sendgrid = require('@sendgrid/mail')

/* Credentials */

if (!process.env.SENDGRID_KEY) {
  throw new Error('Missing SENDGRID_KEY')
}

sendgrid.setApiKey(process.env.SENDGRID_KEY)

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
      from: 'events@gimb.org',
      to: email,
      subject: 'Prijava v Gimb Events',
      text: `Uporabi naslednji link za prijavo ${link}.`,
      html: `Uporabi naslednji link za prijavo <a href="${link}">${link}</a>`,
    })

    return { status: 'ok' }
  } catch (err) {
    return {
      status: 'err',
      message: err.message,
    }
  }
}
