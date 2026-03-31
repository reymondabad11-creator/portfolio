from django.shortcuts import render, redirect
from django.contrib import messages
from django.core.mail import send_mail
from django.conf import settings
from .models import Project, Skill, Certification
from .forms import ContactForm


def home(request):
    """Main portfolio landing page."""
    projects = Project.objects.filter(is_featured=True)[:3]
    skills = Skill.objects.all()
    certifications = Certification.objects.all()
    contact_form = ContactForm()

    # Group skills by category
    skills_by_category = {}
    for skill in skills:
        cat = skill.get_category_display()
        if cat not in skills_by_category:
            skills_by_category[cat] = []
        skills_by_category[cat].append(skill)

    context = {
        'projects': projects,
        'skills_by_category': skills_by_category,
        'certifications': certifications,
        'contact_form': contact_form,
    }
    return render(request, 'portfolio/index.html', context)


def contact(request):
    """Handle contact form submission."""
    if request.method == 'POST':
        form = ContactForm(request.POST)
        if form.is_valid():
            msg = form.save()
            # Try to send email notification
            try:
                send_mail(
                    subject=f"Portfolio Contact: {msg.subject}",
                    message=f"From: {msg.name} <{msg.email}>\n\n{msg.message}",
                    from_email=settings.EMAIL_HOST_USER,
                    recipient_list=[settings.EMAIL_HOST_USER],
                    fail_silently=True,
                )
            except Exception:
                pass
            messages.success(request, 'Message sent successfully! I will get back to you soon.')
        else:
            messages.error(request, 'Please check your input and try again.')
    return redirect('home')


def projects(request):
    """All projects page."""
    all_projects = Project.objects.all()
    return render(request, 'portfolio/projects.html', {'projects': all_projects})
