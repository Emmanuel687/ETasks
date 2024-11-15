<script setup>
// Reactive Variables Start
const faqQuestions = [
  {
    question: "What is ETasks and how does it work?",
    answer: "ETasks is a comprehensive task management application designed to help individuals organize, track, and complete their tasks efficiently. It allows users to create, categorize, and prioritize tasks, as well as set deadlines."
  },
  {
    question: "Do I need to have an account to create a task?",
    answer: "Yes, an account is required to use the ETasks Dashboard. It's free, quick to set up, and provides secure task storage and personalization. You can start creating tasks immediately after signing up with your email."
  },
  {
    question: "How do I create a new task?",
    answer: "Begin by logging in to your account. Click on the 'Tasks' menu in the sidebar, then click the 'New Task' button. Fill in the task details, including the title, description, and due date. Once you've entered all the necessary information, click 'Save' to add the task to your list."
  },
  {
    question: "How can I track the progress of my tasks?",
    answer: "You can track task progress in several ways: 1) Use the drag-and-drop feature to mark tasks as 'Open', 'In Progress', or 'Closed'. 2) For more detailed tracking, use the progress bar feature to indicate percentage completion. 3) Check the task statuses in the dashboard for an overview of all tasks."
  },
  {
    question: "Can I prioritize my tasks?",
    answer: "Absolutely! You can set priority levels for your tasks, such as Low, Medium, or High. When creating or editing a task, look for the 'Priority' dropdown menu. You can also use the drag-and-drop feature in the task list view to manually reorder tasks based on priority."
  },
  {
    question: "How do I mark a task as completed?",
    answer: "To mark a task as completed, simply drag and drop the task in the list view to the 'Completed' section in the task details view. Completed tasks remain visible."
  }
];

// Reactive Variables End


</script>
<template>
  <!-- FAQ Content Section Start -->
  <section class="mt-24 mx-auto max-w-[75%]">

    <!--FAQ Hero Start  -->
    <section class="w-full h-[350px] bg-cover bg-center flex items-center ">
      <p
        class="text-indigo-600 leading-[50.4px] font-[600]  sm:text-right lg:text-right xl:text-right   min-[400px]:!text-[50px]	 !text-[65px] !sm:text-[20px] !lg:text-[42px] xl:text-[42px]">
        How can we help you?
        <br />
        <span class="!text-[20px] text-nowrap  font-500 !text-indigo-550  font-[400] italic">
          "Organize your work and life, finally"
        </span>

      </p>
    </section>
    <!--FAQ Hero End  -->

    <!-- FAQ Sub-Hero Start -->
    <section>
      <h1 class="text-[24px] !text-[#111827] font-[700] leading-[2.5rem]">Frequently asked questions
      </h1>
      <p class="leading-[1.75rem] !text-[16px] mt-[15px]">Have a different question and can’t find the answer you’re
        looking for?
        Reach out to
        our
        <br />
        support team by

        <NuxtLink to="/contact" class="text-[#4f46e5] font-[600]">
          sending
          us
          an email</NuxtLink> and we’ll get back to you as soon as we can.
      </p>
    </section>
    <!-- FAQ Sub-Hero End -->

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
  <!-- FAQ Content Section End -->
</template>


<style lang="scss" scoped>
.main-assestment {
  background-image: url("../../public/assets/backgroundimages/contactus.jpg");
}
</style>
