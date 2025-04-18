import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { Select, SelectOption } from '../ui/select';
import { useToast } from '../ui/toast';

const ContactForm = () => {
  const { addToast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    inquiryType: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    if (!formData.inquiryType) {
      newErrors.inquiryType = 'Please select an inquiry type';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        addToast({
          title: 'Message sent!',
          description: 'Thank you for your message. I will get back to you soon.',
          type: 'success',
        });
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
          inquiryType: ''
        });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      addToast({
        title: 'Error',
        description: 'There was a problem sending your message. Please try again later.',
        type: 'error',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Form animation variants
  const formVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-6"
      variants={formVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants}>
        <FormItem>
          <FormLabel htmlFor="name">Name</FormLabel>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your name"
            className={errors.name ? 'border-destructive' : ''}
          />
          {errors.name && <FormMessage>{errors.name}</FormMessage>}
        </FormItem>
      </motion.div>

      <motion.div variants={itemVariants}>
        <FormItem>
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your email address"
            className={errors.email ? 'border-destructive' : ''}
          />
          {errors.email && <FormMessage>{errors.email}</FormMessage>}
        </FormItem>
      </motion.div>

      <motion.div variants={itemVariants}>
        <FormItem>
          <FormLabel htmlFor="inquiryType">Inquiry Type</FormLabel>
          <Select
            id="inquiryType"
            name="inquiryType"
            value={formData.inquiryType}
            onChange={handleChange}
            className={errors.inquiryType ? 'border-destructive' : ''}
          >
            <SelectOption value="" disabled>Select inquiry type</SelectOption>
            <SelectOption value="acting">Acting Opportunity</SelectOption>
            <SelectOption value="collaboration">Collaboration</SelectOption>
            <SelectOption value="press">Press/Interview</SelectOption>
            <SelectOption value="fan">Fan Message</SelectOption>
            <SelectOption value="other">Other</SelectOption>
          </Select>
          {errors.inquiryType && <FormMessage>{errors.inquiryType}</FormMessage>}
        </FormItem>
      </motion.div>

      <motion.div variants={itemVariants}>
        <FormItem>
          <FormLabel htmlFor="subject">Subject</FormLabel>
          <Input
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="Subject"
            className={errors.subject ? 'border-destructive' : ''}
          />
          {errors.subject && <FormMessage>{errors.subject}</FormMessage>}
        </FormItem>
      </motion.div>

      <motion.div variants={itemVariants}>
        <FormItem>
          <FormLabel htmlFor="message">Message</FormLabel>
          <Textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your message"
            rows={5}
            className={errors.message ? 'border-destructive' : ''}
          />
          {errors.message && <FormMessage>{errors.message}</FormMessage>}
        </FormItem>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Button type="submit" disabled={isSubmitting} className="w-full md:w-auto">
          {isSubmitting ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Sending...
            </>
          ) : (
            'Send Message'
          )}
        </Button>
      </motion.div>
    </motion.form>
  );
};

export default ContactForm;
