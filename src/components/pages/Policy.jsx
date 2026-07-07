import LayoutScreen from "../layouts/Layout";
import { Helmet } from "react-helmet";

export default function PrivacyPolicy() {
    return (
        <LayoutScreen
            compo={
                <>
                    <Helmet>
                        <title>Privacy Policy | Easi Tech Lr</title>

                        <meta
                            name="description"
                            content="Read the Privacy Policy of Easi Tech Lr and learn how we collect, use, and protect your information."
                        />

                        <link
                            rel="canonical"
                            href="https://www.easitechlr.com/privacy"
                        />
                    </Helmet>

                    <article className="bg-white rounded-2xl shadow-lg p-6 lg:p-10">

                        <h1 className="text-4xl font-bold mb-2">
                            Privacy Policy
                        </h1>

                        <p className="text-gray-500 mb-8">
                            Effective Date: July 7, 2026
                        </p>

                        <p className="mb-6 leading-8">
                            Welcome to <strong>Easi Tech Lr</strong>. We respect
                            your privacy and are committed to protecting your
                            personal information. This Privacy Policy explains
                            what information we collect, how we use it, and the
                            choices you have regarding your data.
                        </p>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mb-3">
                                1. Information We Collect
                            </h2>

                            <ul className="list-disc ml-6 space-y-2">
                                <li>Your name (when voluntarily provided).</li>
                                <li>Your email address.</li>
                                <li>Messages submitted through our contact form.</li>
                                <li>Newsletter subscription information.</li>
                                <li>
                                    Browser type, operating system, IP address,
                                    pages visited, and device information.
                                </li>
                                <li>Cookies and similar technologies.</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mb-3">
                                2. How We Use Your Information
                            </h2>

                            <ul className="list-disc ml-6 space-y-2">
                                <li>Respond to your inquiries.</li>
                                <li>Deliver newsletters.</li>
                                <li>Improve our website and services.</li>
                                <li>Analyze website traffic.</li>
                                <li>Prevent fraud and unauthorized access.</li>
                                <li>Comply with applicable laws.</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mb-3">
                                3. Cookies
                            </h2>

                            <p className="leading-8">
                                Our website uses cookies to improve user
                                experience and analyze website performance. You
                                may disable cookies through your browser
                                settings, although some features of the website
                                may not function properly.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mb-3">
                                4. Third-Party Services
                            </h2>

                            <p className="leading-8 mb-4">
                                We use trusted third-party services including:
                            </p>

                            <ul className="list-disc ml-6 space-y-2">
                                <li>Google Analytics</li>
                                <li>Google Search Console</li>
                                <li>Resend</li>
                                <li>Cloudflare R2</li>
                                <li>Railway</li>
                                <li>Vercel</li>
                            </ul>

                            <p className="mt-4 leading-8">
                                These services may collect information according
                                to their own privacy policies.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mb-3">
                                5. Email Communications
                            </h2>

                            <p className="leading-8">
                                If you subscribe to our newsletter or contact
                                us, we may send you updates, responses, and
                                announcements related to Easi Tech Lr. You can
                                unsubscribe from newsletters at any time using
                                the unsubscribe link included in our emails.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mb-3">
                                6. Data Security
                            </h2>

                            <p className="leading-8">
                                We implement reasonable administrative and
                                technical safeguards to protect your personal
                                information. However, no method of internet
                                transmission or electronic storage is completely
                                secure.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mb-3">
                                7. External Links
                            </h2>

                            <p className="leading-8">
                                Our website may contain links to third-party
                                websites. We are not responsible for the privacy
                                practices or content of those external sites.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mb-3">
                                8. Children's Privacy
                            </h2>

                            <p className="leading-8">
                                Easi Tech Lr is not directed toward children
                                under the age of 13. We do not knowingly collect
                                personal information from children.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mb-3">
                                9. Your Rights
                            </h2>

                            <p className="leading-8">
                                Depending on your location, you may have the
                                right to request access, correction, deletion,
                                or restriction of your personal information. You
                                may also withdraw consent where applicable.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mb-3">
                                10. Changes to This Policy
                            </h2>

                            <p className="leading-8">
                                We may update this Privacy Policy periodically.
                                Any changes will be published on this page with
                                an updated effective date.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold mb-3">
                                11. Contact Us
                            </h2>

                            <p className="leading-8">
                                If you have any questions regarding this Privacy
                                Policy or how your information is handled,
                                please contact us.
                            </p>

                            <div className="mt-5 bg-gray-100 rounded-xl p-5">
                                <p>
                                    <strong>Easi Tech Lr</strong>
                                </p>

                                <p>Website: https://www.easitechlr.com</p>

                                <p>Email: hello@easitechlr.com</p>
                            </div>
                        </section>

                    </article>
                </>
            }
        />
    );
}