const { IMAGE_ID, IMAGE_TYPE, REGION, ACCOUNT, SECURITY_GROUP, INSTANCE_PROFILE, KEY_NAME } = require('../../../config')

const getId = (instance) => instance.instanceId
const getUrl = (instance) => instance.url
const getUserId = (instance) => instance.userId || false

const isFree = (instance) => !getUserId(instance)

const setUserId = ({ userId }) => (instance) => ({ ...instance, userId })

const parsedInstanceFrom = ({ instance }) => {
  const { InstanceId, PublicDnsName, KeyName, Tags } = instance
  return {
    instanceId: InstanceId,
    url: PublicDnsName,
    keyName: KeyName,
    ...(Tags || []).reduce((tags, tag) => ({ ...tags, [tag.Key]: tag.Value }), {}),
  }
}

// This purpose can be refactored in order to have different instances with different purposes
const getInstanceTags = ({ userId }) => [
  {
    Key: 'Purpose',
    Value: 'RStudio',
  },
  ...(userId
    ? [
        {
          Key: 'userId',
          Value: userId,
        },
      ]
    : []),
]

const getFilters = () => [
  { Name: 'tag:Purpose', Values: ['RStudio'] },
  {
    Name: 'instance-state-name',
    Values: ['pending', 'running'],
  },
]

const getNewInstanceConfig = ({ userId = false } = {}) => ({
  ImageId: IMAGE_ID, // this iam can be found right to the name of the instance when a new instance is launched by hand, this id is unique by region
  InstanceType: IMAGE_TYPE, // size of the instance
  KeyName: KEY_NAME,
  MaxCount: 1,
  MinCount: 1,
  SecurityGroupIds: [SECURITY_GROUP],
  IamInstanceProfile: {
    Name: INSTANCE_PROFILE,
  },
  Placement: { AvailabilityZone: 'eu-central-1c' },
  UserData: `#!/bin/bash
    sudo mkdir /home/ubuntu/docker-runner
    cd /home/ubuntu/docker-runner
    sudo chown -R $USER:$USER /home/ubuntu/docker-runner

    sudo apt-get update
    sudo apt-get install ca-certificates curl
    sudo install -m 0755 -d /etc/apt/keyrings
    sudo curl -fsSL https://download.docker.com/linux/debian/gpg -o /etc/apt/keyrings/docker.asc
    sudo chmod a+r /etc/apt/keyrings/docker.asc

    # Add the repository to Apt sources:
    echo \
      "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/debian \
      $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
      sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
    sudo apt-get update

    # add current user to "docker" group (to allow running docker without sudo)
    sudo usermod -aG docker $USER
    newgrp docker

    # install Docker
    sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

    # install AWS CLI
    sudo apt install awscli -y

    # login to Amazon ECR
    aws ecr get-login-password --region ${REGION} | docker login --username AWS --password-stdin ${ACCOUNT}

    # pull rstudio image
    docker pull ${ACCOUNT}/rstudio
    sudo docker run -d -p 8787:8787 -e DISABLE_AUTH=true ${ACCOUNT}/rstudio
 `,
  TagSpecifications: [
    {
      ResourceType: 'instance',
      Tags: [...getInstanceTags({ userId })],
    },
  ],
})

const Instance = {
  getId,
  getUrl,
  getUserId,
  isFree,
  setUserId,
  parsedInstanceFrom,
  getNewInstanceConfig,
  getInstanceTags,
  getFilters,
}

module.exports = Instance
