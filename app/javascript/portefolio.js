export function showProject(projectNumber) {
  console.log(`Showing project ${projectNumber}`);
  document.querySelectorAll('.c-item').forEach(item => {
    item.style.display = 'none';
  });
  const selectedProject = document.getElementById(`project_${projectNumber}`);
  if (selectedProject) {
    selectedProject.style.display = 'block';
  }
}
export function openModal(imgSrc) {
  console.log(`Opening modal with ${imgSrc}`);
  var modal = document.getElementById("myModal");
  var modalImg = document.getElementById("img01");
  modal.style.display = "block";
  modalImg.src = imgSrc;
  document.documentElement.style.overflow = "hidden";
}
export function closeModal() {
  console.log("Closing modal");
  var modal = document.getElementById("myModal");
  modal.style.display = "none";
  document.documentElement.style.overflow = "auto";
}
document.addEventListener('DOMContentLoaded', function() {
  console.log("DOM loaded, showing project 1");
  showProject(1);
});
