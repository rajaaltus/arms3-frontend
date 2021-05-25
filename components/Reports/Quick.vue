<template>
  <div>
    <div v-if="isSectionA">
      <div>
        <FomattingAboutDataFormat :aboutData="aboutData" />
      </div>

      <h4 style="font-family: Calibri; font-style: normal;"><b>2. PATIENT CARE ACTIVITIES</b></h4>
      <h4 style="font-family: Calibri; font-style: normal;">A. Clinical Services</h4>
      <div>
        <FomattingPatientCareFormat :clinicalData="clinicalData" />
      </div>
      <h4 style="font-family: Calibri; font-style: normal;"><b>B. Emergency Services</b></h4>
      <div>
        <FomattingEmergencyFormat :emergencyData="emergencyData" />
      </div>
      <h4 style="font-family: Calibri; font-style: normal;"><b>C. Diagnostic Services</b></h4>
      <div>
        <FomattingDiagnosticFormat :diagnosticsData="diagnosticsData" />
      </div>
      <div>
        <FomattingSpecialFormat :specialData="specialData" />
      </div>
      <div>
        <FomattingOTFormat :otservicesData="otservicesData" />
      </div>
      <div>
        <FomattingHRDFormat :hrdCourses="hrdCourses" />
      </div>
      <div>
        <FomattingHrdTrainingsFormat :hrdTrainings="hrdTrainings" />
      </div>
      <div>
        <FomattingRetairedFormat :retaired="retaired" />
      </div>
    </div>

    <div v-if="selectedUserType !== 'STUDENT'">
      <h2 style="font-family: Calibri; font-style: normal;">
        <b><u>Section B:</u></b>
      </h2>
      <h4 style="font-family: Calibri; font-style: normal;">
        <b>1. CONFERENCES / WORKSHOPS / SEMINARS /SYMPOSIUM / SCIENTIFIC PROGRAMMES</b>
      </h4>
      <!-- Program -->
      <!-- International -->
      <div v-if="internationalProgrammes.length > 0">
        <h4 style="font-family: Calibri; font-style: normal;"><u>International</u></h4>
        <div v-for="(program, index) in internationalProgrammes" :key="program.id">
          <FomattingProgramFormat :index="index" :program="program" />
        </div>
      </div>
      <!-- National -->
      <div v-if="nationalProgrammes.length > 0">
        <h4 style="font-family: Calibri; font-style: normal;">National</h4>
        <div v-for="(program, index) in nationalProgrammes" :key="program.id">
          <FomattingProgramFormat :index="index" :program="program" />
        </div>
      </div>
      <!-- Regional -->
      <div v-if="regionalProgrammes.length > 0">
        <h4 style="font-family: Calibri; font-style: normal;">Regional</h4>
        <div v-for="(program, index) in regionalProgrammes" :key="program.id">
          <FomattingProgramFormat :index="index" :program="program" />
        </div>
      </div>
      <!-- State -->
      <div v-if="stateProgrammes.length > 0">
        <h4 style="font-family: Calibri; font-style: normal;">State</h4>
        <div v-for="(program, index) in stateProgrammes" :key="program.id">
          <FomattingProgramFormat :index="index" :program="program" />
        </div>
      </div>
      <!-- Local -->
      <div v-if="localProgrammes.length > 0">
        <h4 style="font-family: Calibri; font-style: normal;">Local</h4>
        <div v-for="(program, index) in localProgrammes" :key="program.id">
          <FomattingProgramFormat :index="index" :program="program" />
        </div>
      </div>

      <!-- Visitor -->
      <h4 style="font-family: Calibri; font-style: normal;">
        <b>2. VISITORS TO THE DEPARTMENT</b>
      </h4>
      <div v-for="(visitor, index) in visitors" :key="visitor.id">
        <FomattingVisitorFormat :visitor="visitor" :index="index" :departmentName="selectedDepartmentName" />
      </div>

      <!-- Training -->
      <h4 style="font-family: Calibri; font-style: normal;">
        <b>3. SPECIFIC TRAINING UNDERWENT BY THE FACULTY /STAFF /STUDENTS OUTSIDE NIMHANS</b>
      </h4>
      <div v-for="(training, index) in trainings" :key="training.id">
        <FomattingTrainingFormat :index="index" :training="training" />
      </div>

      <!-- Presentation -->
      <h4 style="font-family: Calibri; font-style: normal;">
        <b>4. CONTRIBUTION TO SCIENTIFIC DELIBERATIONS</b>
      </h4>
      <h4 style="font-family: Calibri; font-style: normal;">
        <b>A1. PRESENTATIONS</b>
      </h4>
      <div v-if="internationalPresentations.length > 0">
        <h4 style="font-family: Calibri; font-style: normal;"><u>International</u></h4>
        <div v-for="(presentation, index) in internationalPresentations" :key="presentation.id">
          <FomattingPresentationFormat :index="index" :presentation="presentation" />
        </div>
      </div>
      <div v-if="nationalPresentations.length > 0">
        <h4 style="font-family: Calibri; font-style: normal;"><u>National</u></h4>
        <div v-for="(presentation, index) in nationalPresentations" :key="presentation.id">
          <FomattingPresentationFormat :index="index" :presentation="presentation" />
        </div>
      </div>

      <h4 style="font-family: Calibri; font-style: normal;">
        <b>A2. POSTERS</b>
      </h4>
      <div v-if="internationalPosters.length > 0">
        <h4 style="font-family: Calibri; font-style: normal;"><u>International</u></h4>
        <div v-for="(poster, index) in internationalPosters" :key="poster.id">
          <FomattingPresentationFormat :index="index" :presentation="poster" />
        </div>
      </div>
      <div v-if="nationalPosters.length > 0">
        <h4 style="font-family: Calibri; font-style: normal;"><u>National</u></h4>
        <div v-for="(poster, index) in nationalPosters" :key="poster.id">
          <FomattingPresentationFormat :index="index" :presentation="poster" />
        </div>
      </div>

      <!-- Participation -->
      <h4 style="font-family: Calibri; font-style: normal;">
        <b>B. PARTICIPATION</b>
      </h4>

      <div v-if="internationalParticipations.length > 0">
        <h4 style="font-family: Calibri; font-style: normal;"><u>International</u></h4>
        <div v-for="(participation, index) in internationalParticipations" :key="participation.id">
          <FomattingParticipationFormat :index="index" :participation="participation" />
        </div>
      </div>

      <div v-if="nationalParticipations.length > 0">
        <h4 style="font-family: Calibri; font-style: normal;"><u>National</u></h4>
        <div v-for="(participation, index) in nationalParticipations" :key="participation.id">
          <FomattingParticipationFormat :index="index" :participation="participation" />
        </div>
      </div>

      <!-- <div v-for="(participation, index) in participations" :key="participation.id">
              <FomattingParticipationFormat :index="index" :participation="participation" />
            </div> -->

      <!-- Public Engagement -->
      <h4 style="font-family: Calibri; font-style: normal;">
        <b>5. PUBLIC ENGAGEMENT &amp; OUTREACH ACTIVITIES</b>
      </h4>
      <div v-for="(publicE, index) in publics" :key="publicE.id">
        <FomattingPublicEngagementFormat :index="index" :publicE="publicE" />
      </div>

      <!-- Research Activities -->
      <h4 style="font-family: Calibri; font-style: normal;">
        <b>6. RESEARCH ACTIVITIES</b>
      </h4>
      <div v-for="(research, index) in researchData" :key="research.id">
        <FomattingResearchFormat :index="index" :research="research" />
      </div>

      <!-- Publications -->
      <h4 style="font-family: Calibri; font-style: normal;">
        <b>7. PUBLICATIONS</b>
      </h4>
      <div v-if="journalArticles.length > 0">
        <h4 style="font-family: Calibri; font-style: normal;"><u>Journal Articles</u></h4>
        <div v-for="(item, index) in journalArticles" :key="item.id">
          <FomattingPublicationFormat :index="index" :item="item" />
        </div>
      </div>
      <div v-if="newsLetters.length > 0">
        <h4 style="font-family: Calibri; font-style: normal;"><u>Articles for Professionals in Souvenirs Newsletters etc</u></h4>
        <div v-for="(item, index) in newsLetters" :key="item.id">
          <FomattingPublicationFormat :index="index" :item="item" />
        </div>
      </div>
      <div v-if="books.length > 0">
        <h4 style="font-family: Calibri; font-style: normal;"><u>Books</u></h4>
        <div v-for="(item, index) in books" :key="item.id">
          <FomattingPublicationFormat :index="index" :item="item" />
        </div>
      </div>
      <div v-if="bookChapters.length > 0">
        <h4 style="font-family: Calibri; font-style: normal;"><u>Book Chapters</u></h4>
        <div v-for="(item, index) in bookChapters" :key="item.id">
          <FomattingPublicationFormat :index="index" :item="item" />
        </div>
      </div>
      <div v-if="monoGraphs.length > 0">
        <h4 style="font-family: Calibri; font-style: normal;"><u>Monographs</u></h4>
        <div v-for="(item, index) in monoGraphs" :key="item.id">
          <FomattingPublicationFormat :index="index" :item="item" />
        </div>
      </div>
      <div v-if="manuals.length > 0">
        <h4 style="font-family: Calibri; font-style: normal;"><u>Manuals</u></h4>
        <div v-for="(item, index) in manuals" :key="item.id">
          <FomattingPublicationFormat :index="index" :item="item" />
        </div>
      </div>

      <!-- Recognition -->
      <h4 style="font-family: Calibri; font-style: normal;">
        <b>8. RECOGNITION OF NIMHANS CONTRIBUTION</b>
      </h4>
      <h4 style="font-family: Calibri; font-style: normal;">
        <b>A. AWARDS AND HONORS</b>
      </h4>
      <div v-for="(recognition, index) in recognitionsFaculty" :key="recognition.id">
        <FomattingRecognitionFormat :index="index" :recognition="recognition" />
      </div>

      <!-- Patents -->
      <h4 style="font-family: Calibri; font-style: normal;">
        <b>B. PATENTS</b>
      </h4>
      <div v-for="(patent, index) in patents" :key="patent.id">
        <FomattingPatentFormat :index="index" :patent="patent" />
      </div>

      <!-- Key Assignments -->
      <h4 style="font-family: Calibri; font-style: normal;">
        <b>C. KEY ASSIGNMENTS </b>
      </h4>
      <div v-for="(assignment, index) in assignments" :key="assignment.id">
        <FomattingAssignmentFormat :index="index" :assignment="assignment" />
      </div>
    </div>

    <!-- SECTION C -->
    <div v-if="selectedUserType !== 'FACULTY'">
      <h2 style="font-family: Calibri; font-style: normal;">
        <b><u>Section C:</u></b>
      </h2>
      <!-- Presentation -->
      <h4 style="font-family: Calibri; font-style: normal;">
        <b>1. CONTRIBUTION TO SCIENTIFIC DELIBERATIONS</b>
      </h4>
      <h4 style="font-family: Calibri; font-style: normal;">
        <b>A1. PRESENTATIONS</b>
      </h4>
      <div v-if="internationalStudentPresentations.length > 0">
        <h4 style="font-family: Calibri; font-style: normal;"><u>International</u></h4>
        <div v-for="(presentation, index) in internationalStudentPresentations" :key="presentation.id">
          <FomattingPresentationFormat :index="index" :presentation="presentation" />
        </div>
      </div>
      <div v-if="nationalStudentPresentations.length > 0">
        <h4 style="font-family: Calibri; font-style: normal;"><u>National</u></h4>
        <div v-for="(presentation, index) in nationalStudentPresentations" :key="presentation.id">
          <FomattingPresentationFormat :index="index" :presentation="presentation" />
        </div>
      </div>

      <h4 style="font-family: Calibri; font-style: normal;" v-if="internationalStudentPosters.length > 0">
        <b>A2. POSTERS</b>
      </h4>
      <div v-if="internationalStudentPosters.length > 0">
        <h4 style="font-family: Calibri; font-style: normal;"><u>International</u></h4>
        <div v-for="(poster, index) in internationalStudentPosters" :key="poster.id">
          <FomattingPresentationFormat :index="index" :presentation="poster" />
        </div>
      </div>
      <div v-if="nationalStudentPosters.length > 0">
        <h4 style="font-family: Calibri; font-style: normal;"><u>National</u></h4>
        <div v-for="(poster, index) in nationalStudentPosters" :key="poster.id">
          <FomattingPresentationFormat :index="index" :presentation="poster" />
        </div>
      </div>

      <h4 style="font-family: Calibri; font-style: normal;">
        <b>2. PARTICIPATION</b>
      </h4>

      <!-- Participation  -->
      <div v-if="internationalStudentParticipations.length > 0">
        <h4 style="font-family: Calibri; font-style: normal;"><u>International</u></h4>
        <div v-for="(participation, index) in internationalStudentParticipations" :key="participation.id">
          <FomattingParticipationFormat :index="index" :participation="participation" />
        </div>
      </div>

      <div v-if="nationalStudentParticipations.length > 0">
        <h4 style="font-family: Calibri; font-style: normal;"><u>National</u></h4>
        <div v-for="(participation, index) in nationalStudentParticipations" :key="participation.id">
          <FomattingParticipationFormat :index="index" :participation="participation" />
        </div>
      </div>

      <!-- Publication -->
      <h4 style="font-family: Calibri; font-style: normal;">
        <b>3. PUBLICATIONS</b>
      </h4>
      <div v-if="journalArticlesStudents.length > 0">
        <h4 style="font-family: Calibri; font-style: normal;"><u>Journal Articles</u></h4>
        <div v-for="(item, index) in journalArticlesStudents" :key="item.id">
          <FomattingPublicationFormat :index="index" :item="item" />
        </div>
      </div>
      <div v-if="newsLettersStudents.length > 0">
        <h4 style="font-family: Calibri; font-style: normal;"><u>Articles for Professionals in Souvenirs Newsletters etc</u></h4>
        <div v-for="(item, index) in newsLettersStudents" :key="item.id">
          <FomattingPublicationFormat :index="index" :item="item" />
        </div>
      </div>
      <div v-if="booksStudents.length > 0">
        <h4 style="font-family: Calibri; font-style: normal;"><u>Books</u></h4>
        <div v-for="(item, index) in booksStudents" :key="item.id">
          <FomattingPublicationFormat :index="index" :item="item" />
        </div>
      </div>
      <div v-if="bookChaptersStudents.length > 0">
        <h4 style="font-family: Calibri; font-style: normal;"><u>Book Chapters</u></h4>
        <div v-for="(item, index) in bookChaptersStudents" :key="item.id">
          <FomattingPublicationFormat :index="index" :item="item" />
        </div>
      </div>
      <div v-if="monoGraphsStudents.length > 0">
        <h4 style="font-family: Calibri; font-style: normal;"><u>Monographs</u></h4>
        <div v-for="(item, index) in monoGraphsStudents" :key="item.id">
          <FomattingPublicationFormat :index="index" :item="item" />
        </div>
      </div>
      <div v-if="manualsStudents.length > 0">
        <h4 style="font-family: Calibri; font-style: normal;"><u>Manuals</u></h4>
        <div v-for="(item, index) in manualsStudents" :key="item.id">
          <FomattingPublicationFormat :index="index" :item="item" />
        </div>
      </div>

      <!-- Recognition -->
      <h4 style="font-family: Calibri; font-style: normal;">
        <b>4. RECOGNITION OF NIMHANS CONTRIBUTION</b>
      </h4>
      <h4 style="font-family: Calibri; font-style: normal;">
        <b>A. AWARDS AND HONORS</b>
      </h4>
      <div v-for="(recognition, index) in recognitionsStudents" :key="recognition.id">
        <FomattingRecognitionFormat :index="index" :recognition="recognition" />
      </div>

      <!-- Theses -->
      <h4 style="font-family: Calibri; font-style: normal;">
        <b>5. THESES AND DISSERTATIONS</b>
      </h4>
      <div v-for="(item, index) in theses" :key="item.id">
        <FomattingThesesFormat :index="index" :theses="item" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    "isSectionA",
    "selectedDepartmentName",
    "selectedUserType",
    "aboutData",
    "clinicalData",
    "emergencyData",
    "diagnosticsData",
    "specialData",
    "otservicesData",
    "hrdCourses",
    "hrdTrainings",
    "retaired",
    "internationalProgrammes",
    "nationalProgrammes",
    "regionalProgrammes",
    "stateProgrammes",
    "localProgrammes",
    "visitors",
    "trainings",
    "internationalPresentations",
    "nationalPresentations",
    "internationalPosters",
    "nationalPosters",
    "internationalParticipations",
    "nationalParticipations",
    "publics",
    "researchData",
    "journalArticles",
    "newsLetters",
    "books",
    "bookChapters",
    "monoGraphs",
    "manuals",
    "recognitionsFaculty",
    "patents",
    "assignments",
    "internationalStudentPresentations",
    "nationalStudentPresentations",
    "internationalStudentPosters",
    "nationalStudentPosters",
    "internationalStudentParticipations",
    "nationalStudentParticipations",
    "journalArticlesStudents",
    "newsLettersStudents",
    "booksStudents",
    "bookChaptersStudents",
    "monoGraphsStudents",
    "manualsStudents",
    "recognitionsStudents",
    "theses",
  ],
};
</script>
