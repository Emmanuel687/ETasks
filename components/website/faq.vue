<script setup>
// Reactive Variables Start
const faqQuestions = [
  {
    question: "What is ETasks and how does it work?",
    answer: "ETasks is a comprehensive task management application designed to help individuals and teams organize, track, and complete their tasks efficiently. It works by allowing users to create, categorize and prioritize tasks, set deadlines."
  },
  {
    question: "Do I need to have an account to create task?",
    answer: "Yes, an account is required to use ETask Dashboard. It's free, quick to set up, and allows for secure task storage, personalization. You can start creating tasks immediately after signing up with your email."
  },
  {
    question: "How do I create a new task?",
    answer: "Log in, open the Task Menu in the sidebar, enter task details (title, description, due date), and click 'Save' to add the task to your list."
  },
  {
    question: "How can I track the progress of my tasks?",
    answer: "You can track task progress in several ways: 1) Use the status feature to mark tasks as 'Not Started', 'In Progress', or 'Completed'. 2) For more detailed tracking, use the progress bar feature to indicate percentage completion. 3) Check the 'My Tasks' or 'Team Tasks' dashboard for an overview of all task statuses."
  },
  {
    question: "Can I prioritize my tasks?",
    answer: "Absolutely! You can set priority levels for your tasks such as Low, Medium, High, or Urgent. When creating or editing a task, look for the 'Priority' dropdown menu. You can also use the drag-and-drop feature in list view to manually reorder tasks based on priority."
  },
  {
    question: "How do I mark a task as completed?",
    answer: "To mark a task as completed, simply click the checkbox next to the task name in list view, or change the status to 'Completed' in the task details view. Completed tasks can be archived or kept visible based on your preferences in the settings."
  }
];
// Reactive Variables End


</script>
<template>
  <!-- FAQ Section Start -->
  <section class="mt-24 mx-auto max-w-[85%]">
    <!-- FAQ Hero Start -->
    <section>
      <h1 class="text-[24px] !text-[#111827] font-[700] leading-[2.5rem]">Frequently asked questions
      </h1>
      <p class="leading-[1.75rem] !text-[16px] mt-[15px]">Have a different question and can’t find the answer you’re
        looking for?
        Reach out to
        our
        <br />
        support team by

        <a href="#" class="text-[#4f46e5] font-[600]">
          sending
          us
          an email</a> and we’ll get back to you as soon as we can.
      </p>
    </section>
    <!-- FAQ Hero End -->

    <!-- FAQ Questions && Answer Start -->
    <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 !mt-[45px]">
      <div v-for="(faq, index) in faqQuestions" :key="index">
        <h1 class="!leading-[1.75rem] !text-[16px] font-[600]">{{ faq.question }}</h1>
        <p class="!text-[#595759] !text-[16px] leading-[1.73rem] mt-[10px]">{{
          faq.answer }}</p>
      </div>
    </section>
    <!-- FAQ Questions && Answer End -->
  </section>
  <!-- FAQ Section End -->
</template>