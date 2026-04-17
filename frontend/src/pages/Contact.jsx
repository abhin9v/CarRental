import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { motion } from 'motion/react';
import styles from './Contact.module.css';

const PROFILES = [
  {
    icon: '🐙',
    label: 'GitHub',
    sub: 'github.com/abhin9v',
    href: 'https://github.com/abhin9v',
  },
  {
    icon: '💼',
    label: 'LinkedIn',
    sub: 'Abhinav Singh',
    href: 'https://www.linkedin.com/in/abhinav-singh-b1b797213/',
  },
  {
    icon: '⚡',
    label: 'LeetCode',
    sub: 'abhinavvvvv',
    href: 'https://leetcode.com/u/abhinavvvvv/',
  },
  {
    icon: '📧',
    label: 'Email',
    sub: 'abhinav@feastflow.com',
    href: 'mailto:abhinav.s1011@gmail.com',
  },
  {
    icon: '📍',
    label: 'Location',
    sub: 'India 🇮🇳',
    href: null,
  },
];

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleChange = e =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = e => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast.error('Please fill in all fields ⚠️');
      return;
    }
    toast.success("Message sent! We'll get back to you soon. 📬");
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={styles.page}
    >
      <div className={styles.header}>
        <h1 className={styles.title}>
          Get in <span className={styles.accent}>Touch</span>
        </h1>
        <p className={styles.sub}>
          Questions, feedback, or partnership inquiries? Reach out!
        </p>
      </div>

      <div className={styles.grid}>
        {/* Developer profiles */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h3 className={styles.colTitle}>Developer Profiles</h3>
          <div className={styles.profileList}>
            {PROFILES.map(p =>
              p.href ? (
                <motion.a
                  key={p.label}
                  href={p.href}
                  target={p.href.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                  className={styles.profileCard}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className={styles.profileIcon}>{p.icon}</div>
                  <div>
                    <div className={styles.profileLabel}>{p.label}</div>
                    <div className={styles.profileSub}>{p.sub}</div>
                  </div>
                </motion.a>
              ) : (
                <div key={p.label} className={`${styles.profileCard} ${styles.profileCardStatic}`}>
                  <div className={styles.profileIcon}>{p.icon}</div>
                  <div>
                    <div className={styles.profileLabel}>{p.label}</div>
                    <div className={styles.profileSub}>{p.sub}</div>
                  </div>
                </div>
              )
            )}
          </div>
        </motion.div>

        {/* Contact form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h3 className={styles.colTitle}>Send a Message</h3>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.field}>
              <label className={styles.label}>Your Name</label>
              <input
                className={styles.input}
                name="name"
                type="text"
                placeholder="John Doe"
                value={form.name}
                onChange={handleChange}
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Email</label>
              <input
                className={styles.input}
                name="email"
                type="email"
                placeholder="john@example.com"
                value={form.email}
                onChange={handleChange}
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Message</label>
              <textarea
                className={styles.textarea}
                name="message"
                placeholder="Your message here…"
                rows={5}
                value={form.message}
                onChange={handleChange}
              />
            </div>
            <motion.button
              type="submit"
              className={styles.submitBtn}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Send Message 🚀
            </motion.button>
          </form>
        </motion.div>
      </div>
    </motion.main>
  );
};

export default Contact;
