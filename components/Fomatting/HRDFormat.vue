<template>
  <div>
    <h3>3. HUMAN RESOURCE DEVELOPMENT</h3>
    <h3>A. Details of Regular Courses</h3>
    <table>
      <tr>
        <th style="border: 1px solid #dddddd;">Course</th>
        <th style="border: 1px solid #dddddd;">Name of the Candidate</th>
        <th style="border: 1px solid #dddddd;">Duration</th>
        <th style="border: 1px solid #dddddd;">Status</th>
        <th style="border: 1px solid #dddddd;">Title of the thesis (If any)</th>
        <th style="border: 1px solid #dddddd;">Guide(s)(If any)</th>
      </tr>
      <tr v-for="(hrd, index) in hrdCourses" :key="index">
        <td style="border: 1px solid #dddddd;">{{ hrd.course_name }}</td>
        <td style="border: 1px solid #dddddd;">{{ hrd.candidate_name }}</td>
        <td style="border: 1px solid #dddddd;">{{ hrd.durations }} Years</td>
        <td style="border: 1px solid #dddddd;">{{ hrd.remarks_status }}</td>
        <td style="border: 1px solid #dddddd;">{{ hrd.thesis_title }}</td>
        <td style="border: 1px solid #dddddd;">{{ hrd.guides }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  props: ["hrdCourses"],
};
</script>
